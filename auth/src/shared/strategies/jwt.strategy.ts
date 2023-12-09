import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtExtract, JwtPayload } from '../types/jwt.types';
import { UserRepository } from '../../modules/database/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<{ secretKey: string }>('jwt')!.secretKey,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtExtract> {
    const user = await this.userRepository.findById(payload.uid);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return { user, type: payload.type };
  }
}
