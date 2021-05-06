import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { EXAM_NOT_FOUND } from './exam.constants';
import { ExamRepository } from './repositories/exam.repository';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamRepository)
    private readonly repository: ExamRepository,
  ) {}

  @Transactional()
  create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.repository.create(createExamDto);

    return this.repository.save(exam);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const exam = await this.repository.findOne(id);
    if (!exam) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }

    return exam;
  }

  @Transactional()
  async update(id: number, updateExamDto: UpdateExamDto) {
    let exam = await this.findOne(id);

    exam = this.repository.merge(exam, updateExamDto);

    return this.repository.save(exam);
  }

  async remove(id: number) {
    const result = await this.repository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException({ id }, EXAM_NOT_FOUND);
    }
  }
}
