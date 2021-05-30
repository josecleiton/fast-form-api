import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { Between } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import { UpdateExamAgreementDto } from '../dtos/update-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamUser } from '../interfaces/exam-user.interface';
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

  @Transactional()
  async updateAgreement(
    id: number,
    updateAgreementDto: UpdateExamAgreementDto,
  ): Promise<ExamAgreement> {
    let agreement = await this.repository.findOne(id);

    if (!agreement) {
      throw new NotFoundException({ id });
    }

    agreement = this.repository.merge(agreement, updateAgreementDto);

    return this.repository.save(agreement);
  }

  agreementsByDateInterval(start: Date, end: Date): Promise<ExamAgreement[]> {
    return this.repository.find({ where: { createdAt: Between(start, end) } });
  }

  @Transactional()
  getByUser(user: ExamUser): Promise<ExamAgreement[]> {
    return this.repository.find({
      where: { userId: user.id },
      relations: ['exam'],
    });
  }
}
