import { registerAs } from '@nestjs/config';
import { FirebaseModuleOptions } from 'src/firebase';

export const firebaseConfig = registerAs(
  'firebase',
  (): FirebaseModuleOptions => {
    if (!process.env.FIREBASE_ADMIN) {
      throw new Error(
        'Needs FIREBASE_ADMIN env (JSON Service Account as string)',
      );
    }

    if (!process.env.FIREBASE_DB) {
      throw new Error('Needs FIREBASE_DB env var');
    }

    return {
      cert: JSON.parse(process.env.FIREBASE_ADMIN),
      databaseURL: process.env.FIREBASE_DB,
    };
    //return JSON.parse(process.env.FIREBASE_ADMIN);
  },
);
