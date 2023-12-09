import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserExceptions } from './exceptions/user.exceptions';
import { UserEntity } from '../database/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../shared/types/jwt.types';
import { IJwtConfig } from '../../configs/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { LoginResponseDto } from './dtos/response/login-response.dto';
import { comparePasswords } from '../../shared/utils/hash-password';
import { JwtResponse } from './dtos/response/jwt.response';
import * as _ from 'lodash';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { ValidateAccessTokenRequestDto } from './dtos/request/validate-access-token.dto';
import { RefreshTokenResponseDto } from './dtos/response/refresh-token-response.dto';
import { RefreshTokenRequestDto } from './dtos/request/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    // repositories
    private readonly userRepository: UserRepository,

    //services
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = (await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    })) as UserEntity;

    UserExceptions.isUserExistsAndLocked(user);

    const isTooOften = this.checkLoginTooOften(user);

    if (isTooOften) {
      const { minLoginPeriod } = this.configService.get('auth');

      throw new BadRequestException(`Login too often period ${minLoginPeriod}`);
    }

    const { password } = await this.userRepository.getPasswordById(user.id);

    const isPasswordCompared = await comparePasswords(password, dto.password);

    if (!isPasswordCompared) {
      await this.addLoginAttempts(user);

      throw new BadRequestException('Password mismatched');
    }

    await this.resetLoginAttempts(user);

    const recovereduser = await this.userRepository.findOneOrFail({
      where: {
        id: user.id,
      },
    });

    const { access_token, refresh_token } =
      this.generateAccessAndRefreshJwtTokens({
        uid: user.id,
      });

    return {
      access_token,
      refresh_token,
      user: recovereduser,
    };
  }

  async register(registerDto: RegisterRequestDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
      },
    });

    if (candidate) {
      throw new BadRequestException(
        `user by login: ${registerDto.email} exists`,
      );
    }

    const user = await this.userRepository.create({
      ...registerDto,
    });

    return this.userRepository.findOne({
      where: {
        id: user.id,
      },
    }) as Promise<UserEntity>;
  }

  private async addLoginAttempts(user: UserEntity): Promise<void> {
    const loginAttempts = user.login_attempts;

    loginAttempts.push(Date.now());

    await this.userRepository.update(
      { id: user.id },
      { login_attempts: loginAttempts },
    );
  }

  private checkLoginTooOften(user: UserEntity): boolean {
    const { maxLoginAttempts, minLoginPeriod } = this.configService.get<{
      maxLoginAttempts: number;
      minLoginPeriod: number;
    }>('auth')!;

    const lastLogins: number[] = _.takeRight(
      user.login_attempts,
      maxLoginAttempts,
    );

    return (
      lastLogins.length >= maxLoginAttempts &&
      lastLogins[0] > Date.now() - minLoginPeriod * 1000
    );
  }

  private generateAccessAndRefreshJwtTokens(
    payload: Partial<JwtPayload>,
  ): JwtResponse {
    const { accessTokenExpiresIn, refreshTokenExpiresIn, types } =
      this.configService.get<IJwtConfig>('jwt') as IJwtConfig;

    return {
      access_token: this.jwtService.sign(
        { ...payload, type: types.accessToken },
        {
          expiresIn: accessTokenExpiresIn,
        },
      ),
      refresh_token: this.jwtService.sign(
        { ...payload, type: types.refreshToken },
        {
          expiresIn: refreshTokenExpiresIn,
        },
      ),
    };
  }

  private async resetLoginAttempts(user: UserEntity): Promise<void> {
    await this.userRepository.update({ id: user.id }, { login_attempts: [] });
  }

  public async validateAccessTokenDto(
    dto: ValidateAccessTokenRequestDto,
  ): Promise<UserEntity> {
    const types = this.configService.get<IJwtConfig>('jwt') as IJwtConfig;
    const { uid } = this.jwtService.verify(dto.access_token, {
      secret: types.secretKey,
    });

    const user = await this.userRepository.findOne({
      where: {
        id: uid,
      },
    });
    const existedUser = UserExceptions.isUserExistsAndLocked(user);

    return existedUser;
  }

  public async refreshToken(
    dto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const types = this.configService.get<IJwtConfig>('jwt') as IJwtConfig;
    const { uid } = this.jwtService.verify(dto.refresh_token, {
      secret: types.secretKey,
    });

    const user = await this.userRepository.findOne({
      where: {
        id: uid,
      },
    });
    const existedUser = UserExceptions.isUserExistsAndLocked(user);

    const newTokens = this.generateAccessAndRefreshJwtTokens({
      uid: existedUser.id,
    });

    return {
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      user: existedUser,
    };
  }
}
