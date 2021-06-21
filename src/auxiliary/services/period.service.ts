import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from '../entities/period.entity';
import { PeriodRepository } from '../repositories/period.repository';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(PeriodRepository)
    private readonly periodRepository: PeriodRepository,
  ) {}

  findAll(): Promise<Period[]> {
    return this.periodRepository.find();
  }
}
