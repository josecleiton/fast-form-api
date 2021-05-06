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

    if (!process.env.FIREBASE_BUCKET) {
      throw new Error('Needs FIREBASE_BUCKET env var');
    }

    return {
      cert: JSON.parse(process.env.FIREBASE_ADMIN),
      storageBucket: process.env.FIREBASE_BUCKET,
    };
    //return JSON.parse(process.env.FIREBASE_ADMIN);
  },
);
