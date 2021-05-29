import { ApiHideProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateExamAgreementDto {
  @ApiHideProperty()
  userId: number;

  @IsPositive()
  examId: number;
}
