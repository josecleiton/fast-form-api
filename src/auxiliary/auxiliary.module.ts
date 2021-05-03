import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorRepository } from './repositories/professor.repository';
import { StudentRepository } from './repositories/student.repository';
import { ProfessorService } from './services/professor.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository, ProfessorRepository])],
  providers: [StudentService, ProfessorService],
  exports: [StudentService, ProfessorService],
})
export class AuxiliaryModule {}
