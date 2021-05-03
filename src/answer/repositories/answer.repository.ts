import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Answer } from '../entities/answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends BaseRepository<Answer> {}
