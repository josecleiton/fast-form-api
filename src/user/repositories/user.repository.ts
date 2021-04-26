import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create({
      cpf: createUserDto.cpf,
      enrollment: createUserDto.enrollment,
      type: createUserDto.type,
    });
    return this.save(user);
  }
}
