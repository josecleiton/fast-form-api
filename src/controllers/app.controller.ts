import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  ping(): string {
    return 'Healthy';
  }
}
