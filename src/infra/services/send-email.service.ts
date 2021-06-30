import { Injectable } from '@nestjs/common';
import { SendAgreementEmailDto } from '../dtos/send-agreement-email.dto';
import { MailerService } from './mailer.service';
import { TemplateService } from './template.service';

@Injectable()
export class SendEmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly templateService: TemplateService,
  ) {}

  async sendAgreementEmail(dto: SendAgreementEmailDto): Promise<void> {
    const html = this.templateService.get('agreement', dto.agreement);
    const text = this.templateService.get('agreement-text', dto.agreement);

    process.nextTick(() =>
      this.mailerService
        .send({
          html,
          text,
          subject: 'Seu código de sorte',
          to: dto.user.email,
        })
        .catch(console.error),
    );
  }
}
