import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { routes } from './configs/routes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const logger: Logger = app.get(Logger);

  const { title, description, version } = configService.get('swagger');
  const { host, port } = configService.get('http');

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(routes.swagger, app, document);

  app.setGlobalPrefix(routes.root);

  app.enableCors();

  await app.listen(port, host, () =>
    logger.verbose(`Server listening on ${host}:${port}`),
  );
}
bootstrap();
