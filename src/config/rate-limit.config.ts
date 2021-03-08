import { registerAs } from '@nestjs/config';

export const rateLimitConfigKey = 'rateLimit';

export const rateLimitConfig = registerAs(rateLimitConfigKey, () => ({
  timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX ?? '20'),
}));
