import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcryptjs');

import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';

import { LoginDto } from './dtos/login.dto';
import { Auth } from './entities/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  findAuth(authDto: AuthDto): Promise<Auth | undefined> {
    return this.authRepository.findOne({ ...authDto });
  }

  async mustFindAuth(authDto: AuthDto): Promise<Auth> {
    const auth = await this.findAuth(authDto);
    if (!auth) {
      throw new NotFoundException(authDto);
    }

    return auth;
  }

  async login(loginDto: LoginDto): Promise<string> {
    const auth = await this.mustFindAuth(loginDto);

    const match = await bcrypt.compare(loginDto.password, auth.password);
    if (!match) {
      throw new UnauthorizedException(loginDto);
    }

    const user = await this.userService.mustFindUser({
      enrollment: loginDto.login,
    });
    const accessToken = await this.jwtService.signAsync({
      uid: user.enrollment,
      type: user.type,
    });

    return accessToken;
  }

  async createAuth(createAuthDto: CreateAuthDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createAuthDto.password, salt);

    await this.authRepository.save({
      login: createAuthDto.login,
      salt,
      password,
    });
  }
}
