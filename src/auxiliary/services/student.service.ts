import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { Student } from '../entities/student.entity';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly repository: StudentRepository,
  ) {}

  @Transactional()
  createStudent(createDto: CreateUserDto): Promise<Student> {
    const student = this.repository.create(createDto);

    return this.repository.save(student);
  }
}
