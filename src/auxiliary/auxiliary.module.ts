import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradeRepository } from './repositories/grade.repository';
import { PeriodRepository } from './repositories/period.repository';
import { ProfessorRepository } from './repositories/professor.repository';
import { StudentRepository } from './repositories/student.repository';

import { GradeService } from './services/grade.service';
import { PeriodService } from './services/period.service';
import { ProfessorService } from './services/professor.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentRepository,
      ProfessorRepository,
      GradeRepository,
      PeriodRepository,
    ]),
  ],
  providers: [StudentService, ProfessorService, GradeService, PeriodService],
  exports: [StudentService, ProfessorService, GradeService, PeriodService],
})
export class AuxiliaryModule {}
