import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ForbiddenException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

type Callback = (err: Error | null, stat?: boolean) => void;

const isProd = process.env.NODE_ENV === 'production';

const whiteList: RegExp[] = isProd
  ? [new RegExp('^https://(.*\\.|)constante.app$')]
  : [
      new RegExp('^http://localhost:3000$'),
      new RegExp('^http://localhost:5000$'),
    ];

function origin(origin: string, callback: Callback): void {
  return !origin || whiteList.find((re) => origin.match(re))
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
