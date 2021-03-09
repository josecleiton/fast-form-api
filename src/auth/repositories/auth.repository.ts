import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
