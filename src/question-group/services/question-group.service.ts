import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionGroupDto } from '../dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from '../dto/update-question-group.dto';
import { QuestionGroup } from '../entities/question-group.entity';
import { questionGroupNotFound } from '../question-group.constants';
import { QuestionGroupRepository } from '../repositories/question-group.repository';

@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectRepository(QuestionGroupRepository)
    private readonly repository: QuestionGroupRepository,
  ) {}

  create(
    createQuestionGroupDto: CreateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    const questionGroup = this.repository.create(createQuestionGroupDto);
    return this.repository.save(questionGroup);
  }

  findAll(): Promise<QuestionGroup[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<QuestionGroup> {
    const questionGroup = await this.repository.findOne({ id });

    if (!questionGroup) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }

    return questionGroup;
  }

  async update(
    id: number,
    updateQuestionGroupDto: UpdateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    let questionGroup = await this.findOne(id);

    questionGroup = this.repository.merge(
      questionGroup,
      updateQuestionGroupDto,
    );

    return this.repository.save(questionGroup);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.softDelete(id);

    if (!result.affected) {
      throw new NotFoundException({ id }, questionGroupNotFound);
    }
  }
}
