import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const auth = await this.authService.createAuth({
      login: createUserDto.enrollment,
      password: createUserDto.password,
    });
    runOnTransactionRollback((e) => {
      e && console.error(e);
      console.log('create auth transaction completed');
    });
    return await this.userRepository.createUser(createUserDto);
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
