import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { httpConfig, swaggerConfig, typeormConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [swaggerConfig, httpConfig, typeormConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
