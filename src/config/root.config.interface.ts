import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerCustomOptions } from '@nestjs/swagger';
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export type AppConfig = {
  port: number;
};

export type CorsConfig = CorsOptions & {
  enabled: boolean;
};

export type SwaggerConfig = {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  customOptions?: SwaggerCustomOptions;
};

export type RootConfig = {
  app: AppConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  mongoose: MongooseModuleFactoryOptions;
};
