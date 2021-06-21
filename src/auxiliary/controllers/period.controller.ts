import { Controller, forwardRef, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PeriodService } from '../services/period.service';

@Controller('period')
@UseGuards(JwtGuard)
@ApiTags('period')
export class PeriodController {
  constructor(
    @Inject(forwardRef(() => PeriodService))
    private readonly periodService: PeriodService,
  ) {}

  @Get()
  find() {
    return this.periodService.findAll();
  }
}
