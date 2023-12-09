import { registerAs } from '@nestjs/config';
import { JwtTypes } from '../modules/auth/types/auth-types.enum';

export interface IJwtTypes {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtConfig {
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  secretKey: string;
  types: IJwtTypes;
}

export default registerAs(
  'jwt',
  (): IJwtConfig => ({
    accessTokenExpiresIn: 1000 * 60 * 10,
    refreshTokenExpiresIn: 1000 * 60 * 60 * 24,
    secretKey: process.env.JWT_SECRET_KEY,
    types: {
      accessToken: JwtTypes.ACCESS_TOKEN,
      refreshToken: JwtTypes.REFRESH_TOKEN,
    },
  }),
);
