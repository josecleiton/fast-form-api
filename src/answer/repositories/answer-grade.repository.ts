import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AnswerGrade } from '../entities/answer-grade.entity';

@EntityRepository(AnswerGrade)
export class AnswerGradeRepository extends BaseRepository<AnswerGrade> {}
