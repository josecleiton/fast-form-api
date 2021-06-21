import { Module } from '@nestjs/common';
import { QuestionGroupService } from './services/question-group.service';
import { QuestionGroupController } from './controllers/question-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionGroupRepository } from './repositories/question-group.repository';
import { QuestionController } from './controllers/question.controller';
import { ExamModule } from '../exam/exam.module';
import { QuestionService } from './services/question.service';
import { QuestionRepository } from './repositories/question.repository';
import { PersonalQuestionGroup } from './providers/personal-group.provider';
import { AuxiliaryModule } from 'src/auxiliary/auxiliary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionGroupRepository, QuestionRepository]),
    ExamModule,
    AuxiliaryModule,
  ],
  controllers: [QuestionGroupController, QuestionController],
  providers: [QuestionGroupService, PersonalQuestionGroup, QuestionService],
  exports: [QuestionService],
})
export class QuestionGroupModule {}
