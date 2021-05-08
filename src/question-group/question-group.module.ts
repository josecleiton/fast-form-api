import { Module } from '@nestjs/common';
import { QuestionGroupService } from './services/question-group.service';
import { QuestionGroupController } from './controllers/question-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionGroupRepository } from './repositories/question-group.repository';
import { QuestionModule } from './question/question.module';
import { QuestionController } from './controllers/question.controller';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionGroupRepository]),
    QuestionModule,
    ExamModule,
  ],
  controllers: [QuestionGroupController, QuestionController],
  providers: [QuestionGroupService],
})
export class QuestionGroupModule {}
