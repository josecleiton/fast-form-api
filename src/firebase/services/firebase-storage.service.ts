import firebase from 'firebase-admin';
import { Injectable } from '@nestjs/common';

import { FirebaseAdmin } from '../firebase-admin';
import { FirebaseStorageUploadDto } from '../dtos/firebase-storage-upload.dto';

@Injectable()
export class FirebaseStorageService {
  private readonly storage: firebase.storage.Storage;

  constructor(firebaseAdmin: FirebaseAdmin) {
    this.storage = firebaseAdmin.storage();
  }

  async upload(
    path: string,
    { data, contentType, publicFile, bucket }: FirebaseStorageUploadDto,
  ): Promise<string> {
    const file = this.storage.bucket(bucket).file(path);
    await file.save(data, {
      gzip: true,
      contentType,
      public: publicFile,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    return file.publicUrl();
  }
}
