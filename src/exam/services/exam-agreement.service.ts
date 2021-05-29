import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamAgreementRepository } from '../repositories/exam-agreement.repository';

@Injectable()
export class ExamAgreementService {
  constructor(
    @InjectRepository(ExamAgreementRepository)
    private readonly repository: ExamAgreementRepository,
  ) {}

  @Transactional()
  createAgreement(
    createAgreementDto: CreateExamAgreementDto,
  ): Promise<ExamAgreement> {
    const agreement = this.repository.create(createAgreementDto);

    return this.repository.save(agreement);
  }

  agreementsByDateInterval(start: Date, end: Date): Promise<ExamAgreement[]> {
    return this.repository.find({ where: { createdAt: Between(start, end) } });
  }
}
