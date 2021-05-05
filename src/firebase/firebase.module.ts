import { DynamicModule, Module, Provider } from '@nestjs/common';

import { FirebaseAuthService } from './services/firebase-auth.service';
import { FirebaseCloudMessagingService } from './services/firebase-cloud-messaging.service';
import {
  FirebaseAsyncModuleOptions,
  FirebaseModuleOptions,
} from './interfaces/firebase-async-module-options.interface';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { FirebaseStorageService, FirebaseFirestoreService } from './services';

@Module({
  providers: [FirebaseAuthService, FirebaseCloudMessagingService],
  exports: [FirebaseAuthService, FirebaseCloudMessagingService],
})
export class FirebaseModule {
  private static readonly providers: Provider[] = [
    FirebaseAuthService,
    FirebaseCloudMessagingService,
    FirebaseStorageService,
    FirebaseFirestoreService,
  ];

  private static readonly exports: Provider[] = [
    FirebaseAuthService,
    FirebaseCloudMessagingService,
    FirebaseStorageService,
    FirebaseFirestoreService,
  ];

  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      global: true,
      imports: [FirebaseAdminModule.forRoot(options)],
      providers: [...this.providers],
      exports: this.exports,
    };
  }

  static forRootAsync(options: FirebaseAsyncModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      global: true,
      imports: [FirebaseAdminModule.forRootAsync(options)],
      providers: [...this.providers],
      exports: this.exports,
    };
  }
}
