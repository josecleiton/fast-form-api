import { Injectable, Inject } from '@nestjs/common';
import firebase from 'firebase-admin';
import { FIREBASE_OPTIONS } from '../firebase-admin.constants';
import { FirebaseModuleOptions } from '../../interfaces';

@Injectable()
export class FirebaseAdmin implements firebase.app.App {
  private readonly app: firebase.app.App;

  constructor(@Inject(FIREBASE_OPTIONS) options: FirebaseModuleOptions) {
    this.app = firebase.initializeApp({
      databaseURL: options.databaseURL,
      credential: firebase.credential.cert(options.cert),
    });
  }

  get name(): string {
    return this.app.name;
  }

  get options(): firebase.AppOptions {
    return this.app.options;
  }

  auth(): firebase.auth.Auth {
    return this.app.auth();
  }

  database(url?: string): firebase.database.Database {
    return this.app.database(url);
  }

  firestore(): firebase.firestore.Firestore {
    return this.app.firestore();
  }

  instanceId(): firebase.instanceId.InstanceId {
    return this.app.instanceId();
  }

  machineLearning(): firebase.machineLearning.MachineLearning {
    return this.app.machineLearning();
  }

  messaging(): firebase.messaging.Messaging {
    return this.app.messaging();
  }

  projectManagement(): firebase.projectManagement.ProjectManagement {
    return this.app.projectManagement();
  }

  remoteConfig(): firebase.remoteConfig.RemoteConfig {
    return this.app.remoteConfig();
  }

  securityRules(): firebase.securityRules.SecurityRules {
    return this.app.securityRules();
  }

  storage(): firebase.storage.Storage {
    return this.app.storage();
  }

  delete(): Promise<void> {
    return this.app.delete();
  }
}
