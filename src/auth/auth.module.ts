import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { jwtConfigKey } from '../config';

import { CaslModule } from './casl/casl.module';

import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtGuard } from './guards/jwt.guard';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get(jwtConfigKey)!,
      inject: [ConfigService],
    }),
    UserModule,
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [AuthService, JwtGuard, CaslModule],
})
export class AuthModule {}
