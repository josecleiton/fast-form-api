import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendEmailService } from 'src/infra/services/send-email.service';
import { CustomLogger } from 'src/logger/logger.service';

import { Between } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import {
  UpdateExamAgreementDto,
  UpdateExamAgreementQueryDto,
} from '../dtos/update-exam-agreement.dto';
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
    private readonly sendEmailService: SendEmailService,
    private readonly logger: CustomLogger,
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

    const agreement = this.repository.create({
      ...createAgreementDto,
      userId: user.id,
    });

    if (user.email) {
      await this.sendAgreementEmail(user.email, agreement);
    }

    return this.repository.save(agreement);
  }

  private async sendAgreementEmail(
    email: string,
    agreement: ExamAgreement,
  ): Promise<void> {
    try {
      await this.sendEmailService.sendAgreementEmail({
        user: { email },
        agreement,
      });
      agreement.uniqueCodeSendedAt = new Date();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Transactional()
  async updateAgreement(
    queryDto: UpdateExamAgreementQueryDto,
    updateAgreementDto: UpdateExamAgreementDto,
  ): Promise<ExamAgreement> {
    const agreement = await this.repository.findOne({
      where: {
        examId: queryDto.examId,
        userId: queryDto.user.id,
      },
    });

    if (!agreement) {
      throw new NotFoundException(queryDto);
    }

    if (agreement.hasFinishedExam) {
      delete updateAgreementDto.anonymous;
    }

    return this.repository.save(
      this.repository.merge(agreement, updateAgreementDto),
    );
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

  @Transactional()
  async finishExam(agreement: ExamAgreement): Promise<ExamAgreement> {
    agreement.status = ExamAgreementStatus.FINISHED;

    return this.repository.save(agreement);
  }
}
