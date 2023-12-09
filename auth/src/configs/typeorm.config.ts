import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
}));
