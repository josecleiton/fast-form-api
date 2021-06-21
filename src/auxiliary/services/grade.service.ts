import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from '../entities/grade.entity';
import { Period } from '../entities/period.entity';
import { GradeRepository } from '../repositories/grade.repository';
import type { UserToFind } from '../types/user-to-find.type';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeRepository)
    private readonly gradeRepository: GradeRepository,
  ) {}

  findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  findByUserAndPeriod(user: UserToFind, period: Period): Promise<Grade[]> {
    return this.gradeRepository.findByUserAndPeriod(user, period);
  }
}
