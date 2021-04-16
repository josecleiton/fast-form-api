import { EntityRepository, Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';

@EntityRepository(Professor)
export class ProfessorRepository extends Repository<Professor> {}
