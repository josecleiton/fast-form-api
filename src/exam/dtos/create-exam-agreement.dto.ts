import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ExamAgreementDto } from './exam-agreement.dto';

export class CreateExamAgreementDto extends OmitType(ExamAgreementDto, [
  'userId',
]) {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anonymous?: boolean;
}
