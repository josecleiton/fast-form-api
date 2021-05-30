import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import { UpdateExamAgreementDto } from '../dtos/update-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamAgreementService } from '../services/exam-agreement.service';

@Controller('exam-agreement')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('ExamAgreement')
export class ExamAgreementController {
  constructor(private readonly examAgreementService: ExamAgreementService) {}

  @Post()
  async createAgreement(
    @Body() createAgreementDto: CreateExamAgreementDto,
    @GetUser() user: { id: number },
  ): Promise<ExamAgreement> {
    return await this.examAgreementService.createAgreement({
      ...createAgreementDto,
      userId: user.id,
    });
  }

  @Put(':id')
  async updateAgreemment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgreementDto: UpdateExamAgreementDto,
  ): Promise<ExamAgreement> {
    return await this.examAgreementService.updateAgreement(
      id,
      updateAgreementDto,
    );
  }
}
