import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export function createUser(createUserDto: CreateUserDto): User {
  const user = new User();
  user.cpf = createUserDto.cpf;
  user.enrollment = createUserDto.enrollment;
  user.type = createUserDto.type;
  user.role = createUserDto.role;
  return user;
}
