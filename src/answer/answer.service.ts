import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftDeleteResult } from 'src/core/interfaces/soft-delete-result.interface';
import { ExamAgreementService } from 'src/exam/services/exam-agreement.service';
import { Question } from 'src/question-group/entities/question.entity';
import { QuestionService } from 'src/question-group/services/question.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { AnswerType } from './enums/answer-type.enum';
import { BatchUser } from './interfaces/batch-user.interface';
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
    private readonly examAgreementService: ExamAgreementService,
  ) {}

  @Transactional()
  async createBatch(
    createAnswerDtos: CreateAnswerDto[],
    user: BatchUser,
  ): Promise<Answer[]> {
    const examAgreement = await this.examAgreementService.findOne(user);
    const questions = await this.questionService.findByIds(
      createAnswerDtos.map((dto) => dto.questionId),
    );
    const questionMap: ReadonlyMap<number, Question> = new Map(
      questions.map((question) => [question.id, question]),
    );

    await this.answerRepository.delete({ examAgreement });

    const answers = await Promise.all(
      createAnswerDtos.map(async (answerDto) => {
        const question = questionMap.get(answerDto.questionId);
        if (!question) {
          throw new NotFoundException(answerDto, 'Question not found');
        }

        const createDto = { ...answerDto, examAgreement };

        if (answerDto.type === AnswerType.ANSWER_GRADE) {
          return this.answerGradeRepository.save(
            this.answerGradeRepository.create(createDto),
          );
        }

        return this.answerRepository.save(
          this.answerRepository.create(createDto),
        );
      }),
    );

    await this.examAgreementService.finishExam(examAgreement);

    return answers;
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
  }

  @Transactional()
  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    let answer = await this.findOne(id);
    answer = this.answerRepository.merge(answer, updateAnswerDto);

    return this.answerRepository.save(answer);
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
