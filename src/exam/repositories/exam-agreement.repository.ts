import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ExamAgreement } from '../entities/exam-agreement.entity';

@EntityRepository(ExamAgreement)
export class ExamAgreementRepository extends BaseRepository<ExamAgreement> {}
