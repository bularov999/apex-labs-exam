import {
  Injectable,
  ExecutionContext,
  Logger,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(JwtAuthGuard.name);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const http = context.switchToHttp().getRequest();
      const token = http.headers.authorization;

      if (!token) {
        this.logger.warn(
          `[${http?.method}] ${http?.url}: empty Authorization header`,
        );
        throw new UnauthorizedException('Empty Authorization header');
      }

      const user = await this.authService.findUser(token);

      if (!user) {
        return false;
      }

      http.user = user;

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
