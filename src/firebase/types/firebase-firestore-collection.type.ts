import firebase from 'firebase-admin';

export type FirebaseFirestoreCollection = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;
