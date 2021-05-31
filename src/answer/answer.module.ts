import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from './repositories/answer.repository';
import { AnswerGradeRepository } from './repositories/answer-grade.repository';
import { QuestionGroupModule } from 'src/question-group/question-group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerRepository, AnswerGradeRepository]),
    QuestionGroupModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
