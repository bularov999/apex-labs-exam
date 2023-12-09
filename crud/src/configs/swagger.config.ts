import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: 'e-commerce KG API',
  description: 'Api for E-commerce KG api',
  version: '1.0',
}));
