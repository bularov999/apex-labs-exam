import {
  applyDecorators,
  Controller,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ControllerDecorator = (
  rootRoute: string,
): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiTags(rootRoute),
    UsePipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    ),
    Controller(rootRoute),
  );
