import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { QuestionGroup } from '../entities/question-group.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionFindDto } from './dtos/question-find.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { Question } from './entities/question.entity';
import { questionNotFound } from './question.constants';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly repository: QuestionRepository,
  ) {}

  @Transactional()
  createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.repository.create(createQuestionDto);

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
  async remove(id: number): Promise<void> {
    const result: SoftDeleteResult = await this.repository.softDelete({ id });
    if (!result.raw.affectedRows) {
      throw new NotFoundException({ id }, questionNotFound);
    }
  }
}
