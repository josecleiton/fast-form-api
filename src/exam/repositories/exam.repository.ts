import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Exam } from '../entities/exam.entity';

@EntityRepository(Exam)
export class ExamRepository extends BaseRepository<Exam> {}
