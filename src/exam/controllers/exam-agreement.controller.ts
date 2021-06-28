import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { CreateExamAgreementDto } from '../dtos/create-exam-agreement.dto';
import {
  UpdateExamAgreementDto,
  UpdateExamAgreementDtoQuery,
} from '../dtos/update-exam-agreement.dto';
import { ExamAgreement } from '../entities/exam-agreement.entity';
import { ExamAgreementUser } from '../interfaces/exam-agreement-user.interface';
import { ExamUser } from '../interfaces/exam-user.interface';
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

  @Put()
  @ApiOkResponse({ type: ExamAgreement })
  async updateAgreemment(
    @GetUser() user: ExamUser,
    @Query() queryDto: UpdateExamAgreementDtoQuery,
    @Body() updateAgreementDto: UpdateExamAgreementDto,
  ): Promise<ExamAgreement> {
    return this.examAgreementService.updateAgreement(
      { ...queryDto, user },
      updateAgreementDto,
    );
  }
}
