import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';

import { SendMailDto } from '../dtos/send-mail.dto';
import { NODEMAILER_TRANSPORTER } from '../infra.constants';
import { MailerService } from './mailer.service';

@Injectable()
export class NodeMailerService implements MailerService {
  constructor(
    @Inject(NODEMAILER_TRANSPORTER) private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async send(sendMailDto: SendMailDto): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM')!,
      ...sendMailDto,
    });
  }
}
