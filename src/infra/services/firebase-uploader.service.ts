import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { FirebaseStorageService } from 'src/firebase';
import { FileSendDto } from '../dtos/file-send.dto';
import { UploaderService } from './uploader.service';

@Injectable()
export class FirebaseUploader implements UploaderService {
  constructor(private readonly storageService: FirebaseStorageService) {}

  private getName(fileDto: FileSendDto, path: string): string {
    if (fileDto.noRandomName) {
      return `${path}/${fileDto.originalname}`;
    }

    return `${path}/${randomBytes(32).toString('hex')}`;
  }

  async upload(fileDto: FileSendDto, path = ''): Promise<string> {
    return this.storageService.upload(this.getName(fileDto, path), {
      data: fileDto.buffer,
      contentType: fileDto.mimetype,
      publicFile: true,
    });
  }
}
