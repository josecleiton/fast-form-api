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
import { UniversityModule } from './university/university.module';
import { AuxiliaryModule } from './auxiliary/auxiliary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configs }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get(databaseConfigKey)!,
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    ExamModule,
    QuestionGroupModule,
    AnswerModule,
    UniversityModule,
    AuxiliaryModule,
  ],
})
export class AppModule {}
