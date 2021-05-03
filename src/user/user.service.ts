import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProfessorService } from 'src/auxiliary/services/professor.service';
import { StudentService } from 'src/auxiliary/services/student.service';
import {
  runOnTransactionComplete,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { createUser } from './helpers/create-user.helper';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
    private readonly professorService: ProfessorService,
  ) {}

  @Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.createUserByType(createUserDto);
    await this.authService.createAuth({
      login: createUserDto.enrollment,
      password: createUserDto.password,
    });
    runOnTransactionComplete((e) => {
      e && console.error(e);
      console.log('create auth transaction completed');
    });
    return user;
  }

  private async createUserByType(createUserDto: CreateUserDto): Promise<User> {
    switch (createUserDto.type) {
      case UserType.PROFESSOR:
        return this.professorService.createStudent(createUserDto);
      case UserType.STUDENT:
        return this.studentService.createStudent(createUserDto);
      default:
        throw new UnprocessableEntityException();
    }
  }

  findUser(userDto: UserDto): Promise<User | undefined> {
    return this.userRepository.findOne({ ...userDto });
  }

  async mustFindUser(userDto: UserDto): Promise<User> {
    const user = await this.findUser(userDto);
    if (!user) {
      throw new UnauthorizedException(userDto);
    }
    return user;
  }
}
