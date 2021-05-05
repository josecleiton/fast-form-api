import { registerAs } from '@nestjs/config';
import { SwaggerOptions } from './interfaces/swagger.interface';

export const swaggerConfigKey = 'swagger';

export const swaggerConfig = registerAs(
  swaggerConfigKey,
  (): SwaggerOptions => ({
    title: 'Fast Form',
    description: 'Fast Form API',
    version: 'v0.0.1',
    users: { ff: 'senhaforte' },
  }),
);
