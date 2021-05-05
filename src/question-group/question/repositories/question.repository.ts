import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Question } from '../entities/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends BaseRepository<Question> {}
