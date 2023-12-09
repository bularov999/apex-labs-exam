import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  maxLoginAttempts: 3,
  minLoginPeriod: 90,

  maxResetPasswordAttempts: 3,
  minResetPasswordPeriod: 90,
}));
