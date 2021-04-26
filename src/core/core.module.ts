import { Global, Module } from '@nestjs/common';
import { PayloadInterceptor } from './interceptors/payload.interceptor';

@Global()
@Module({ providers: [PayloadInterceptor], exports: [PayloadInterceptor] })
export class CoreModule {}
