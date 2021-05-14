import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ForbiddenException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

type Callback = (err: Error | null, stat?: boolean) => void;

const isProd = process.env.NODE_ENV === 'production';

const allowedOrigins: RegExp[] = isProd
  ? [new RegExp('^https://(.*\\.|)herokuapp.com$')]
  : [
      new RegExp('^http://localhost:*$'),
      new RegExp('^https://(.*\\.|)herokuapp.com$'),
    ];

function origin(origin: string, callback: Callback): void {
  return !origin || allowedOrigins.some((re) => Boolean(origin.match(re)))
    ? callback(null, true)
    : callback(
        new ForbiddenException(
          `Origin not allowed by CORS Middleware. ${origin}`,
        ),
      );
}

export const corsConfigKey = 'cors';

export const corsConfig = registerAs(
  corsConfigKey,
  (): CorsOptions => ({
    origin,
    optionsSuccessStatus: 200,
  }),
);
