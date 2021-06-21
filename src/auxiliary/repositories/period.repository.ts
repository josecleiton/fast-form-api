import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Period } from '../entities/period.entity';

@EntityRepository(Period)
export class PeriodRepository extends BaseRepository<Period> {}
