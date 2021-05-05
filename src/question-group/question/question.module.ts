import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
