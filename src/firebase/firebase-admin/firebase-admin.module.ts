import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  FirebaseAsyncModuleOptions,
  FirebaseModuleOptions,
} from '../interfaces';
import { FirebaseAdmin } from './providers/firebase-admin.provider';
import { FIREBASE_OPTIONS } from './firebase-admin.constants';

@Module({ providers: [FirebaseAdmin], exports: [FirebaseAdmin] })
export class FirebaseAdminModule {
  private static readonly exports = [FirebaseAdmin];
  private static readonly providers: Provider[] = [FirebaseAdmin];

  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: options,
        },
        ...this.providers,
      ],
    };
  }

  static forRootAsync(options: FirebaseAsyncModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        ...this.providers,
      ],
      exports: this.exports,
    };
  }
}
