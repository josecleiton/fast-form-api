import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Auth } from '../entities/auth.entity';

@EntityRepository(Auth)
export class AuthRepository extends BaseRepository<Auth> {}
