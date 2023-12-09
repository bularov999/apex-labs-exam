import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm-config.service';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  providers: [PostRepository],
  exports: [PostRepository],
})
export class DatabaseModule {}
