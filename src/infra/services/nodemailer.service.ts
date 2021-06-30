import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { CustomLogger } from 'src/logger/logger.service';

import { SendMailDto } from '../dtos/send-mail.dto';
import { NODEMAILER_TRANSPORTER } from '../infra.constants';
import { MailerService } from './mailer.service';

@Injectable()
export class NodeMailerService implements MailerService {
  constructor(
    @Inject(NODEMAILER_TRANSPORTER) private readonly transporter: Transporter,
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('NodeMailerService');
  }

  async send(sendMailDto: SendMailDto): Promise<void> {
    const envelope = {
      from: `UNEB Form <${this.configService.get('MAIL_FROM')}>`,
      to: sendMailDto.to,
    };
    this.logger.log(
      await this.transporter.sendMail({
        ...sendMailDto,
        ...envelope,
      }),
    );
  }
}
