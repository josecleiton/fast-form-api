import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { FirebaseAdmin } from '../firebase-admin';

@Injectable()
export class FirebaseCloudMessagingService {
  private readonly fcm: firebase.messaging.Messaging;
  constructor(firebaseAdmin: FirebaseAdmin) {
    this.fcm = firebaseAdmin.messaging();
  }

  sendToDevice(
    token: string,
    message: firebase.messaging.MessagingPayload,
    options?: firebase.messaging.MessagingOptions,
  ): Promise<firebase.messaging.MessagingDevicesResponse> {
    return this.fcm.sendToDevice(token, message, options);
  }
}
