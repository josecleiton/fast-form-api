import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { FirebaseAdmin } from '../firebase-admin';
import { FirebaseFirestoreCollection } from '../types/firebase-firestore-collection.type';

@Injectable()
export class FirebaseFirestoreService {
  private readonly firestore: firebase.firestore.Firestore;

  constructor(firebaseAdmin: FirebaseAdmin) {
    this.firestore = firebaseAdmin.firestore();
  }

  getCollection(collection: string): FirebaseFirestoreCollection {
    return this.firestore.collection(collection);
  }
}
