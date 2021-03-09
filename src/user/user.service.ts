import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  findUser(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async mustFindUser(email: string): Promise<User> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(user);
    }
    return user;
  }
}
