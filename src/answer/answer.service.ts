import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { Question } from 'src/question-group/entities/question.entity';
import { QuestionService } from 'src/question-group/services/question.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { AnswerType } from './enums/answer-type.enum';
import { AnswerGradeRepository } from './repositories/answer-grade.repository';
import { AnswerRepository } from './repositories/answer.repository';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerRepository)
    private readonly answerRepository: AnswerRepository,
    @InjectRepository(AnswerGradeRepository)
    private readonly answerGradeRepository: AnswerGradeRepository,
    private readonly questionService: QuestionService,
  ) {}

  @Transactional()
  async createBatch(createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]> {
    const questions = await this.questionService.findByIds(
      createAnswerDtos.map((dto) => dto.questionId),
    );
    const questionMap: ReadonlyMap<number, Question> = new Map<
      number,
      Question
    >(questions.map((question) => [question.id, question]));

    return await Promise.all(
      createAnswerDtos.map(async (answerDto) => {
        const question = questionMap.get(answerDto.questionId);
        if (!question) {
          throw new NotFoundException(answerDto, 'Question Not Found');
        }

        if (answerDto.type === AnswerType.ANSWER) {
          const answer = this.answerRepository.create(answerDto);
          return await this.answerRepository.save(answer);
        } else {
          const answer = this.answerGradeRepository.create(answerDto);
          return await this.answerGradeRepository.save(answer);
        }
      }),
    );
  }

  findAll() {
    return this.answerRepository.find();
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne(id);
    if (!answer) {
      throw new NotFoundException({ id });
    }
    return answer;
    // const raw:
    //   | { id: number; type: AnswerType }
    //   | undefined = await this.answerRepository.query(
    //   'SELECT id, type FROM `answer` WHERE id = ?',
    //   [id],
    // );
    // if (!raw) {
    //   throw new NotFoundException({ id });
    // }

    // return raw.type === AnswerType.ANSWER_GRADE
    //   ? await this.answerGradeRepository.findOneOrFail(id)
    //   : await this.answerRepository.findOneOrFail(id);
  }

  @Transactional()
  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    let answer = await this.findOne(id);
    answer = this.answerRepository.merge(answer, updateAnswerDto);

    return await this.answerRepository.save(answer);
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const affected: SoftDeleteResult = await this.answerRepository.softDelete(
      id,
    );

    if (!affected.raw.affectedRows) {
      throw new NotFoundException({ id });
    }
  }
}
