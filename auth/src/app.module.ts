import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  authConfig,
  httpConfig,
  jwtConfig,
  swaggerConfig,
  typeormConfig,
} from './configs';
import { DatabaseModule } from './modules/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsersSeedCommander } from './modules/commander/user-seed.commander';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [swaggerConfig, httpConfig, typeormConfig, authConfig, jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, UsersSeedCommander],
})
export class AppModule {}
