import firebase from 'firebase-admin';
import { ModuleMetadata } from '@nestjs/common';

export interface FirebaseModuleOptions {
  cert: firebase.ServiceAccount;
  databaseURL: string;
}

export interface FirebaseAsyncModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => FirebaseModuleOptions | Promise<FirebaseModuleOptions>;
  inject?: any[];
}
