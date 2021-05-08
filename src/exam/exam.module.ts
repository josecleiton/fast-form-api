import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './repositories/exam.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository])],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
