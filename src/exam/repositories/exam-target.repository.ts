import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ExamTarget } from '../entities/exam-target.entity';

@EntityRepository(ExamTarget)
export class ExamTargetRepository extends BaseRepository<ExamTarget> {}
