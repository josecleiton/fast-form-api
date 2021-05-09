import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { QuestionGroup } from '../entities/question-group.entity';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionFindDto } from '../dtos/question-find.dto';
import { ReorderQuestionDto } from '../dtos/reorder-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { Question } from '../entities/question.entity';
import { questionNotFound } from '../question.constants';
import { QuestionRepository } from '../repositories/question.repository';
import { QuestionGroupService } from './question-group.service';
import { last } from 'src/core/utils/last.util';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly repository: QuestionRepository,
    @Inject(forwardRef(() => QuestionGroupService))
    private readonly groupService: QuestionGroupService,
  ) {}

  private async getNextPosition(groupId: number): Promise<number> {
    const { questions } = await this.groupService.findOne(groupId);

    return (last(questions)?.position ?? -1) + 1;
  }

  @Transactional()
  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = this.repository.create({
      ...createQuestionDto,
      position: await this.getNextPosition(createQuestionDto.groupId),
    });

    return this.repository.save(question);
  }

  find(findDto: QuestionFindDto): Promise<Question[]> {
    return this.repository.find({
      where: (qb) => {
        if (findDto.groupId) {
          qb.where(`${qb.alias}.groupId = :groupId`, findDto);
        }
        return qb;
      },
    });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.repository.findOne({ id });
    if (!question) {
      throw new NotFoundException({ id }, questionNotFound);
    }

    return question;
  }

  @Transactional()
  async update(id: number, updateDto: UpdateQuestionDto): Promise<Question> {
    let question = await this.findOne(id);

    if (updateDto.groupId && question.groupId !== updateDto.groupId) {
      question.position = await this.getNextPosition(updateDto.groupId);
    }

    question = this.repository.merge(question, updateDto);

    return this.repository.save(question);
  }

  @Transactional()
  async copyToGroup(
    group: QuestionGroup,
    questions: Question[],
  ): Promise<Question[]> {
    return await this.repository.save(
      questions.map((question) =>
        this.repository.create({ ...question, group, id: undefined }),
      ),
    );
  }

  @Transactional()
  async reorder({
    groupId,
    questionIds,
  }: ReorderQuestionDto): Promise<Question[]> {
    const questions = await this.repository.find({
      where: { groupId, id: In(questionIds) },
    });

    const questionPositionMap: ReadonlyMap<number, number> = new Map(
      questionIds.map((id, position) => [id, position]),
    );

    return await this.repository.save(
      questions.map((question) => {
        question.position = questionPositionMap.get(question.id) ?? 0;
        return question;
      }),
    );
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete({ id });
    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, questionNotFound);
    }
  }
}
