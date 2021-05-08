import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { ExamService } from 'src/exam/exam.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CopyQuestionGroupDto } from '../dto/copy-question-group.dto';
import { CreateQuestionGroupDto } from '../dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from '../dto/update-question-group.dto';
import { QuestionGroup } from '../entities/question-group.entity';
import { questionGroupNotFound } from '../question-group.constants';
import { Question } from '../question/entities/question.entity';
import { QuestionService } from '../question/question.service';
import { QuestionGroupRepository } from '../repositories/question-group.repository';

@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectRepository(QuestionGroupRepository)
    private readonly repository: QuestionGroupRepository,
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
  ) {}

  @Transactional()
  async create(
    createQuestionGroupDto: CreateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    const questionGroup = this.repository.create(createQuestionGroupDto);
    if (createQuestionGroupDto.examId) {
      questionGroup.exam = await this.examService.findOne(
        createQuestionGroupDto.examId,
      );
    }
    return this.repository.save(questionGroup);
  }

  findAll(): Promise<QuestionGroup[]> {
    return this.repository.find({ relations: ['questions'] });
  }

  async findOne(id: number): Promise<QuestionGroup> {
    const questionGroup = await this.repository.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!questionGroup) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }

    return questionGroup;
  }

  @Transactional()
  async update(
    id: number,
    updateQuestionGroupDto: UpdateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    let questionGroup = await this.findOne(id);

    questionGroup = this.repository.merge(
      questionGroup,
      updateQuestionGroupDto,
    );

    if (updateQuestionGroupDto.examId) {
      questionGroup.exam = await this.examService.findOne(
        updateQuestionGroupDto.examId,
      );
    }

    return this.repository.save(questionGroup);
  }

  @Transactional()
  async copy(
    copyQuestionGroupDto: CopyQuestionGroupDto,
  ): Promise<QuestionGroup> {
    const toCopy = await this.findOne(copyQuestionGroupDto.groupId);
    const exam = await this.examService.findOne(copyQuestionGroupDto.examId);

    let group = this.repository.create({
      ...toCopy,
      questions: [],
      exam,
      id: undefined,
    });

    group = await this.repository.save(group);
    group.questions = await this.questionService.copyToGroup(
      group,
      toCopy.questions,
    );

    return group;
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete(id);

    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }
  }
}
