import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Professor } from '../entities/professor.entity';

@EntityRepository(Professor)
export class ProfessorRepository extends BaseRepository<Professor> {}
