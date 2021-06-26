import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { ExamService } from 'src/exam/services/exam.service';
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
import { FindPersonalDto } from '../dtos/find-personal.dto';
import { PersonalQuestionGroup } from '../providers/personal-group.provider';
import { Student } from 'src/auxiliary/entities/student.entity';
import { Professor } from 'src/auxiliary/entities/professor.entity';
import { questionGroupRelations } from '../question.constants';

@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectRepository(QuestionGroupRepository)
    private readonly repository: QuestionGroupRepository,
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly personalGroup: PersonalQuestionGroup,
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
    return this.repository.find({ relations: questionGroupRelations});
  }

  async findOne(id: number): Promise<QuestionGroup> {
    const questionGroup = await this.repository.findOne({
      where: { id },
      relations: questionGroupRelations,
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

    return (
      await Promise.all(
        groups.map(async (group) => {
          group.position = groupIdPositionMap.get(group.id) ?? 0;
          await this.repository.update(group.id, { position: group.position });
          return group;
        }),
      )
    ).sort((a, b) => a.position - b.position);
  }

  async findPersonal({
    examId,
    user,
  }: FindPersonalDto): Promise<QuestionGroup[]> {
    const exam = await this.examService.findOne(examId);

    const result = await this.repository.find({
      where: { exam, class: false },
      relations: questionGroupRelations,
    });

    if (user instanceof Student || user instanceof Professor) {
      const personalGroups = await this.personalGroup.getPersonal(user, exam);
      result.push(...personalGroups);
    }

    return result;
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete(id);

    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }
  }
}
