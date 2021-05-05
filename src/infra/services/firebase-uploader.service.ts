import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { FirebaseStorageService } from 'src/firebase';
import { FileSendDto } from '../dtos/file-send.dto';
import { UploaderService } from './uploader.service';

@Injectable()
export class FirebaseUploader implements UploaderService {
  constructor(private readonly storageService: FirebaseStorageService) {}

  async upload(fileDto: FileSendDto, path = ''): Promise<string> {
    return await this.storageService.upload(
      `${path}/${randomBytes(32).toString('hex')}`,
      fileDto.buffer,
      fileDto.mimetype,
      true,
    );
  }
}
