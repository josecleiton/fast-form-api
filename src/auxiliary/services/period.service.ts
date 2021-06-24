import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
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

  async getLastPeriod(): Promise<Period> {
    const period = await this.periodRepository.findOne({
      where: {
        startedAt: MoreThanOrEqual(new Date()),
        endedAt: LessThanOrEqual(new Date()),
      },
    });

    if (!period) {
      throw new NotFoundException('period not found for given date');
    }

    return period;
  }
}
