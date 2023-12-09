import { registerAs } from '@nestjs/config';

export default registerAs('http', () => ({
  host: process.env.HTTP_HOST,
  port: process.env.HTTP_PORT,
}));
