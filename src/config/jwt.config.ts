import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfigKey = 'jwt';
export const jwtConfig = registerAs(
  jwtConfigKey,
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: { issuer: 'ff.uneb.br', expiresIn: '10h' },
  }),
);
