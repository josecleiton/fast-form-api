import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dtos/login.dto';

@Controller("auth")
export class AuthController {
  private readonly authService: AuthService;

  @Post()
  login(@Body() loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto);
  }
}
