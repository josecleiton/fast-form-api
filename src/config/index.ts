import { corsConfig } from './cors.config';
import { databaseConfig } from './database.config';
import { rateLimitConfig } from './rate-limit.config';
import { swaggerConfig } from './swagger.config';

export { swaggerConfigKey } from './swagger.config';
export { databaseConfigKey } from './database.config';
export { rateLimitConfigKey } from './rate-limit.config';
export { corsConfigKey } from './cors.config';

export const configs = [
  swaggerConfig,
  databaseConfig,
  rateLimitConfig,
  corsConfig,
];
