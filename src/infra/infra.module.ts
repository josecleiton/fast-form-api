import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { FirebaseModule } from 'src/firebase';
import { UploadController } from './controllers/upload.controller';
import { NODEMAILER_TRANSPORTER } from './infra.constants';
import { FirebaseUploader } from './services/firebase-uploader.service';
import { MailerService } from './services/mailer.service';
import { NodeMailerService } from './services/nodemailer.service';
import { UploaderService } from './services/uploader.service';

@Module({
  imports: [
    ConfigModule,
    FirebaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('firebase')!,
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: UploaderService, useClass: FirebaseUploader },
    {
      provide: NODEMAILER_TRANSPORTER,
      useFactory: (configService: ConfigService) =>
        createTransport(configService.get('nodemailer')),
      inject: [ConfigService],
    },
    { provide: MailerService, useClass: NodeMailerService },
  ],
  controllers: [UploadController],
  exports: [UploaderService, MailerService],
})
export class InfraModule {}
