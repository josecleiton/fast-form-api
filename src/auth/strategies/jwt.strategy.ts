import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConfigKey } from '../../config';

import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtModuleOptions>(jwtConfigKey)!.secret,
    });
  }

  async validate(payload: { email: string }): Promise<unknown> {
    const auth = await this.authService.findAuth(payload.email);
    if (!auth) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findUser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
