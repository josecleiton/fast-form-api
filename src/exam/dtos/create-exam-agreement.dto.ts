import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class CreateExamAgreementDto {
  @ApiHideProperty()
  userId: number;

  @IsPositive()
  examId: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anonymouns?: boolean;
}
