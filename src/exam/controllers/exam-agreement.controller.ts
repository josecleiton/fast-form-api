import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import { UpdateExamAgreementDto } from '../dtos/update-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamAgreementUser } from '../interfaces/exam-agreement-user.interface';
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
    @GetUser() user: ExamAgreementUser,
  ): Promise<ExamAgreement> {
    return this.examAgreementService.createAgreement(createAgreementDto, user);
  }

  @Put(':id')
  @ApiOkResponse({ type: ExamAgreement })
  async updateAgreemment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgreementDto: UpdateExamAgreementDto,
  ): Promise<ExamAgreement> {
    return this.examAgreementService.updateAgreement(id, updateAgreementDto);
  }
}
