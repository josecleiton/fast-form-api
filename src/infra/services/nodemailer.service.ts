import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { Transporter } from 'nodemailer';

import { SendMailDto } from '../dtos/send-mail.dto';
import { NODEMAILER_TRANSPORTER } from '../infra.constants';
import { MailerService } from './mailer.service';

@Injectable()
export class NodeMailerService implements MailerService {
  constructor(
    @Inject(NODEMAILER_TRANSPORTER) private readonly transporter: Transporter,
  ) {}

  async send(sendMailDto: SendMailDto): Promise<void> {
    throw new NotImplementedException(
      { sendMailDto, transporter: this.transporter },
      'Method not implemented.',
    );
  }
}
