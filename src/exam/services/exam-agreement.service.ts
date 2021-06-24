import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Professor } from 'src/auxiliary/entities/professor.entity';
import { Student } from 'src/auxiliary/entities/student.entity';
import { Between } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import { UpdateExamAgreementDto } from '../dtos/update-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamAgreementStatus } from '../enums/exam-agreement-status.enum';
import { ExamAgreementUser } from '../interfaces/exam-agreement-user.interface';
import { ExamUser } from '../interfaces/exam-user.interface';
import { ExamAgreementRepository } from '../repositories/exam-agreement.repository';
import { ExamService } from './exam.service';

@Injectable()
export class ExamAgreementService {
  constructor(
    @InjectRepository(ExamAgreementRepository)
    private readonly repository: ExamAgreementRepository,
    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,
  ) {}

  @Transactional()
  async createAgreement(
    createAgreementDto: CreateExamAgreementDto,
    user: ExamAgreementUser,
  ): Promise<ExamAgreement> {
    const exam = await this.examService.findOne(createAgreementDto.examId);
    const alreadyAgreed = await this.repository.findOne({
      where: { exam, user },
    });
    if (alreadyAgreed) {
      throw new ConflictException('already agreed');
    }

    const agreement = this.repository.create({ ...createAgreementDto, user });

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

  async findOne(findDto: {
    userId: number;
    examId: number;
  }): Promise<ExamAgreement> {
    const agreement = await this.repository.findOne({
      where: findDto,
      relations: ['exam'],
    });

    if (!agreement) {
      throw new NotFoundException(findDto);
    }

    return agreement;
  }

  async finishExam(agreement: ExamAgreement): Promise<ExamAgreement> {
    agreement.status = ExamAgreementStatus.FINISHED;

    return this.repository.save(agreement);
  }
}
