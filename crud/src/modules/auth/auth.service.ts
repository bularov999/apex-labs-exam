import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  public async findUser(token: string): Promise<IUser> {
    const authUrl = this.configService.get('AUTH_URL');
    const response = await this.httpService.axiosRef.post<IUser>(authUrl, {
      token: token,
    });

    if (!response.data) {
      throw new UnauthorizedException('User not found');
    }

    return response.data;
  }
}
