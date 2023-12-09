import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } =
      this.configService.get('typeorm');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: false,
      entities: [path.join(__dirname, './entities/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
      useUTC: true,
    };
  }
}
