import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './repositories/exam.repository';
import { ExamTargetRepository } from './repositories/exam-target.repository';
import { ExamTargetService } from './services/exam-target.service';
import { ExamTargetController } from './controllers/exam-target.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository, ExamTargetRepository])],
  controllers: [ExamController, ExamTargetController],
  providers: [ExamService, ExamTargetService],
  exports: [ExamService],
})
export class ExamModule {}
