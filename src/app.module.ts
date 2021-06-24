import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configs, databaseConfigKey } from './config';

import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
import { QuestionGroupModule } from './question-group/question-group.module';
import { AnswerModule } from './answer/answer.module';
import { CoreModule } from './core/core.module';
import { AuxiliaryModule } from './auxiliary/auxiliary.module';
import { InfraModule } from './infra/infra.module';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configs }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get(databaseConfigKey)!,
      inject: [ConfigService],
    }),
    CoreModule,
    LoggerModule,
    AuthModule,
    UserModule,
    ExamModule,
    QuestionGroupModule,
    AnswerModule,
    AuxiliaryModule,
    InfraModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
