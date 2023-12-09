import { Body } from '@nestjs/common';
import { routes } from '../../configs/routes.config';
import { ControllerDecorator } from '../../shared/decorators/controller.decorator';
import { PostDecorator } from '../../shared/decorators/method.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/response/login-response.dto';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { ValidateAccessTokenRequestDto } from './dtos/request/validate-access-token.dto';
import { RefreshTokenResponseDto } from './dtos/response/refresh-token-response.dto';
import { RefreshTokenRequestDto } from './dtos/request/refresh-token.dto';

@ControllerDecorator(routes.auth.root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PostDecorator(
    routes.auth.login,
    'Method for login user to application',
    () => LoginResponseDto,
  )
  async login(@Body() logindDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(logindDto);
  }

  @PostDecorator(
    routes.auth.register,
    'Method for create user with registration',
    () => UserEntity,
  )
  async register(@Body() registerDto: RegisterRequestDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }

  @PostDecorator(
    routes.auth.validate,
    'Route for validate access token',
    () => UserEntity,
  )
  async validateAccessToken(
    @Body() validateAccessTokenDto: ValidateAccessTokenRequestDto,
  ): Promise<UserEntity> {
    return this.authService.validateAccessTokenDto(validateAccessTokenDto);
  }

  @PostDecorator(
    routes.auth.register,
    'Route for refreshing tokens',
    () => RefreshTokenResponseDto,
  )
  public async refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
