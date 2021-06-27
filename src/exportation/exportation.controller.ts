import {
  Controller,
  ParseIntPipe,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExportationService } from './exportation.service';

@Controller('export')
@ApiTags('Exportation')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ExportationController {
  
  constructor(
    private readonly service: ExportationService
  ) {}

  @Post('/csv/:examId')
  async exportToCsv(
    @Param('examId', ParseIntPipe) examId: number,
  ) {
    return this.service.exportToCsv(examId);
  }
}
