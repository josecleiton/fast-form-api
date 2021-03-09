import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');

import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';

import { LoginDto } from './dtos/login.dto';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthRepository } from './repositories/auth.repository';
import { CreateAuthDto } from './dtos/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  findAuth(email: string): Promise<Auth | undefined> {
    return this.authRepository.findOne({ email });
  }

  async mustFindAuth(email: string): Promise<Auth> {
    const auth = await this.findAuth(email);
    if (!auth) {
      throw new NotFoundException({ email });
    }
    return auth;
  }

  async login(loginDto: LoginDto): Promise<JwtPayload> {
    const auth = await this.mustFindAuth(loginDto.email);
    const isMatch = await bcrypt.compare(loginDto.password, auth.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.mustFindUser(loginDto.email);
    const accessToken = await this.jwtService.signAsync(user);
    return {
      uid: auth.email,
      accessToken,
    };
  }

  async createAuth(createAuthDto: CreateAuthDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createAuthDto.password, salt);
    await this.authRepository.save({
      email: createAuthDto.email,
      salt,
      password,
    });
  }
}
