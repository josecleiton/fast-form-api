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
import { UserResult } from './interfaces/user-specialized-result.interface';
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

  async findSpecializedUser(userDto: UserDto): Promise<User | undefined> {
    const partialUser:
      | UserResult
      | undefined = await this.userRepository.findOne({
      select: ['type', 'id'],
      where: { ...userDto },
    });

    if (!partialUser) {
      throw new UnauthorizedException(userDto);
    }

    let user: User | undefined;

    switch (partialUser.type) {
      case UserType.PROFESSOR:
        user = await this.professorService.findOne(userDto);
        break;
      case UserType.STUDENT:
        user = await this.studentService.findOne(userDto);
        break;
      default:
        user = await this.userRepository.findOne({ ...userDto });
    }

    return user;
  }

  async mustFindSpecializedUser(userDto: UserDto): Promise<User> {
    const user = await this.findSpecializedUser(userDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
