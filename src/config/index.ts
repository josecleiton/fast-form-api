import { corsConfig } from './cors.config';
import { databaseConfig } from './database.config';
import { firebaseConfig } from './firebase.config';
import { jwtConfig } from './jwt.config';
import { rateLimitConfig } from './rate-limit.config';
import { swaggerConfig } from './swagger.config';

export { swaggerConfigKey } from './swagger.config';
export { databaseConfigKey } from './database.config';
export { rateLimitConfigKey } from './rate-limit.config';
export { corsConfigKey } from './cors.config';
export { jwtConfigKey } from './jwt.config';

export const configs = [
  swaggerConfig,
  databaseConfig,
  rateLimitConfig,
  corsConfig,
  jwtConfig,
  firebaseConfig,
];
