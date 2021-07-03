import { ApiHideProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class ExamAgreementDto {
  @ApiHideProperty()
  userId!: number;

  @IsPositive()
  examId!: number;
}
