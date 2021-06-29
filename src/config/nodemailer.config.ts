import { registerAs } from '@nestjs/config';

export const nodemailerConfig = registerAs('nodemailer', () => ({
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD,
  },
}));
