import { SendMailDto } from '../dtos/send-mail.dto';

export abstract class MailerService {
  abstract send(sendMailDto: SendMailDto): Promise<void>;
}
