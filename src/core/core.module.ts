import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PayloadInterceptor } from './interceptors/payload.interceptor';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PayloadInterceptor, HttpExceptionFilter],
  exports: [PayloadInterceptor, HttpExceptionFilter],
})
export class CoreModule {}
