import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamDto } from './dtos/create-exam.dto';
import { ExamTargetManagerDto } from './dtos/exam-target-manager.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { EXAM_NOT_FOUND } from './exam.constants';
import { ExamRepository } from './repositories/exam.repository';
import { ExamTargetService } from './services/exam-target.service';

@Injectable()
export class ExamService {
  private static readonly relations = ['groups', 'period', 'agreements'];

  constructor(
    @InjectRepository(ExamRepository)
    private readonly repository: ExamRepository,
    private readonly targetService: ExamTargetService,
  ) {}

  private async newExam(dto: CreateExamDto | UpdateExamDto): Promise<Exam> {
    const { targets, ...entityLike } = dto;
    const exam = this.repository.create(entityLike);

    if (targets) {
      const targetMap = await this.targetService.targetMap;
      exam.targets = targets.map((target) => targetMap.get(target)!);
    }

    return exam;
  }

  @Transactional()
  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = await this.newExam(createExamDto);

    return this.repository.save(exam);
  }

  findAll() {
    return this.repository.find({ relations: ExamService.relations });
  }

  async findOne(id: number) {
    const exam = await this.repository.findOne(id, {
      relations: ExamService.relations,
    });
    if (!exam) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }

    return exam;
  }

  @Transactional()
  async update(id: number, updateExamDto: UpdateExamDto) {
    let exam = await this.findOne(id);

    exam = this.repository.merge(exam, await this.newExam(updateExamDto));

    return this.repository.save(exam);
  }

  @Transactional()
  async remove(id: number) {
    const result: SoftDeleteResult = await this.repository.softDelete(id);
    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }
  }
}
