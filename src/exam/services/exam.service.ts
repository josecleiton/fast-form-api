import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodService } from 'src/auxiliary/services/period.service';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { Exam } from '../entities/exam.entity';
import { EXAM_NOT_FOUND } from '../exam.constants';
import { ExamUser } from '../interfaces/exam-user.interface';
import { ExamPersonalResult } from '../models/exam-personal-result.model';
import { ExamRepository } from '../repositories/exam.repository';
import { ExamTargetService } from './exam-target.service';

@Injectable()
export class ExamService {
  private static readonly relations = [
    'groups',
    'period',
    'agreements',
    'targets',
  ];

  constructor(
    @InjectRepository(ExamRepository)
    private readonly repository: ExamRepository,
    private readonly targetService: ExamTargetService,
    private readonly periodService: PeriodService,
  ) {}

  private async newExam(dto: CreateExamDto | UpdateExamDto): Promise<Exam> {
    const { targets, ...entityLike } = dto;
    const exam = this.repository.create(entityLike);

    if (targets) {
      const targetMap = await this.targetService.getTargetMap();
      exam.targets = targets.map((target) => targetMap.get(target)!);
    }

    return exam;
  }

  @Transactional()
  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = await this.newExam(createExamDto);
    exam.period = await this.periodService.getPeriodByInterval(exam);

    return this.repository.save(exam);
  }

  findAll(): Promise<Exam[]> {
    return this.repository.find({ relations: ExamService.relations });
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.repository.findOne(id, {
      relations: ExamService.relations,
    });
    if (!exam) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }

    return exam;
  }

  @Transactional()
  async findPersonal(user: ExamUser): Promise<ExamPersonalResult> {
    const alreadyAgreed = await this.repository.findByUser(user);

    const targets = this.targetService.getTargetsForUser(user.type);

    const canAgree = await this.repository.findByTargets({
      ignoreExams: alreadyAgreed,
      targets,
    });

    return { alreadyAgreed, canAgree };
  }

  @Transactional()
  async update(id: number, updateExamDto: UpdateExamDto) {
    let exam = await this.findOne(id);

    exam = this.repository.merge(exam, await this.newExam(updateExamDto));

    return this.repository.save(exam);
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete(id);
    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }
  }
}
