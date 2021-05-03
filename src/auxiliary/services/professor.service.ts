import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { Professor } from '../entities/professor.entity';
import { ProfessorRepository } from '../repositories/professor.repository';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorRepository)
    private readonly repository: ProfessorRepository,
  ) {}

  @Transactional()
  createStudent(createDto: CreateUserDto): Promise<Professor> {
    const professor = this.repository.create(createDto);

    return this.repository.save(professor);
  }
}
