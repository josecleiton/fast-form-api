import { Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  ping(): string {
    return 'Healthy';
  }

  @Post('health')
  @HttpCode(200)
  pong() {
    return "Uh";
  }
}
