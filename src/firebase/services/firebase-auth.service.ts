import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';

import { FirebaseAuthDecodedToken } from '../interfaces/firebase-auth-decoded-token.interface';
import { FirebaseAdmin } from '../firebase-admin';

@Injectable()
export class FirebaseAuthService {
  private readonly firebaseAuth: firebase.auth.Auth;
  constructor(firebaseAdmin: FirebaseAdmin) {
    this.firebaseAuth = firebaseAdmin.auth();
  }

  async verifyToken(token: string): Promise<FirebaseAuthDecodedToken | null> {
    try {
      const decoded = await this.firebaseAuth.verifyIdToken(token);
      return {
        uid: decoded.uid,
        email: decoded.email,
        emailVerified: decoded.email_verified,
      };
    } catch (err) {
      return null;
    }
  }

  getUser(uid: string): Promise<firebase.auth.UserRecord> {
    return this.firebaseAuth.getUser(uid);
  }

  createUser(
    createDto: firebase.auth.CreateRequest,
  ): Promise<firebase.auth.UserRecord> {
    return this.firebaseAuth.createUser(createDto);
  }

  updateUser(
    uid: string,
    updateDto: firebase.auth.UpdateRequest,
  ): Promise<firebase.auth.UserRecord> {
    return this.firebaseAuth.updateUser(uid, updateDto);
  }

  deleteUser(uid: string): Promise<void> {
    return this.firebaseAuth.deleteUser(uid);
  }
}
