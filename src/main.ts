import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  AppConfig,
  CorsConfig,
  SwaggerConfig,
} from './config/root.config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  //Set up swagger
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    swaggerConfig.path,
    app,
    document,
    swaggerConfig.customOptions,
  );

  //Set up cors
  const corsConfig = configService.get<CorsConfig>('cors');
  if (corsConfig.enabled) {
    app.enableCors(corsConfig);
  }

  //Listen port
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port);
}

bootstrap();
