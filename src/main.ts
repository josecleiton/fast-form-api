import helmet = require('helmet');
import rateLimit = require('express-rate-limit');
import compression = require('compression');
import morgan = require('morgan');
import basicAuth = require('express-basic-auth');

import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SwaggerOptions } from './config/interfaces/swagger.interface';
import { swaggerConfigKey } from './config/swagger.config';
import { CustomLogger } from './logger/logger.service';
import { corsConfigKey, rateLimitConfigKey } from './config';

const DEFAULT_PORT = 3000;

const logger = new Logger('bootstrap');

function buildSwaggerDoc(app: INestApplication, config: ConfigService): void {
  const swaggerOptions = config.get<SwaggerOptions>(swaggerConfigKey)!;
  const docsPath = '/' + config.get('SWAGGER_PATH', 'docs');
  app.use(
    docsPath,
    basicAuth({
      challenge: true,
      users: { ...swaggerOptions.users },
    }),
  );
  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setDescription(swaggerOptions.description)
    .setVersion(swaggerOptions.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(docsPath, app, document);
  logger.log(`Docs generated in ${docsPath} using Swagger (OpenAPI)`);
}

function applySecurityLayer(
  app: NestExpressApplication,
  config: ConfigService,
): void {
  app.use(helmet());
  app.use(rateLimit(config.get(rateLimitConfigKey)));
  app.enableCors(config.get(corsConfigKey));
  app.use(morgan(config.get('NODE_ENV') !== 'production' ? 'dev' : 'common'));
  logger.log('Security layer applied to the app');
}

function applyPerfLayer(app: NestExpressApplication): void {
  app.use(compression());
}

async function applyGlobals(app: INestApplication): Promise<void> {
  const logger = await app.resolve(CustomLogger);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(logger);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = parseInt(configService.get('PORT')!) ?? DEFAULT_PORT;

  applySecurityLayer(app, configService);
  applyPerfLayer(app);
  await applyGlobals(app);
  buildSwaggerDoc(app, configService);

  if (PORT === DEFAULT_PORT) {
    logger.warn(`App using default port :${DEFAULT_PORT}`);
  }

  await app.listen(PORT, '0.0.0.0');
  logger.log(`App listening to port :${PORT}`);
  logger.log(`App running on: ${await app.getUrl()}`);
}

bootstrap();
