import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { ExamService } from 'src/exam/exam.service';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CopyQuestionGroupDto } from '../dtos/copy-question-group.dto';
import { CreateQuestionGroupDto } from '../dtos/create-question-group.dto';
import { ReorderQuestionGroupDto } from '../dtos/reorder-question-group.dto';
import { UpdateQuestionGroupDto } from '../dtos/update-question-group.dto';
import { QuestionGroup } from '../entities/question-group.entity';
import { questionGroupNotFound } from '../question-group.constants';
import { QuestionService } from './question.service';
import { QuestionGroupRepository } from '../repositories/question-group.repository';
import { last } from 'src/core/utils/last.util';
import { createAliasResolver } from '@casl/ability';

@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectRepository(QuestionGroupRepository)
    private readonly repository: QuestionGroupRepository,
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
  ) {}

  private async setExamAndPosition(
    questionGroup: QuestionGroup,
    examId: number,
  ) {
    questionGroup.exam = await this.examService.findOne(examId);

    questionGroup.position =
      (last(questionGroup.exam.groups)?.position ?? -1) + 1;
  }

  @Transactional()
  async create(
    createQuestionGroupDto: CreateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    const questionGroup = this.repository.create(createQuestionGroupDto);
    if (createQuestionGroupDto.examId) {
      await this.setExamAndPosition(
        questionGroup,
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

    if (
      updateQuestionGroupDto.examId &&
      updateQuestionGroupDto.examId !== questionGroup.examId
    ) {
      await this.setExamAndPosition(
        questionGroup,
        updateQuestionGroupDto.examId,
      );
    }

    questionGroup = this.repository.merge(
      questionGroup,
      updateQuestionGroupDto,
    );

    return this.repository.save(questionGroup);
  }

  @Transactional()
  async copy(
    copyQuestionGroupDto: CopyQuestionGroupDto,
  ): Promise<QuestionGroup> {
    const toCopy = await this.findOne(copyQuestionGroupDto.groupId);
    const exam = await this.examService.findOne(copyQuestionGroupDto.examId);

    const group = await this.repository.save(
      this.repository.create({
        ...toCopy,
        questions: [],
        exam,
        id: undefined,
      }),
    );

    group.questions = await this.questionService.copyToGroup(
      group,
      toCopy.questions,
    );

    return group;
  }

  @Transactional()
  async reorder({
    examId,
    groupIds,
  }: ReorderQuestionGroupDto): Promise<QuestionGroup[]> {
    const groups = await this.repository.find({
      where: { examId, id: In(groupIds) },
    });

    const groupIdPositionMap: ReadonlyMap<number, number> = new Map(
      groupIds.map((id, position) => [id, position]),
    );

    return await this.repository.save(
      groups.map((group) => {
        group.position = groupIdPositionMap.get(group.id) ?? 0;
        return group;
      }),
    );
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete(id);

    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }
  }
}
