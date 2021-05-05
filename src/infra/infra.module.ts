import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase';
import { UploadController } from './controllers/upload.controller';
import { FirebaseUploader } from './services/firebase-uploader.service';
import { UploaderService } from './services/uploader.service';

@Module({
  imports: [
    FirebaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('firebase')!,
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: UploaderService, useClass: FirebaseUploader }],
  controllers: [UploadController],
  exports: [UploaderService],
})
export class InfraModule {}
