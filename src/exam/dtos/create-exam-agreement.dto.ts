import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ExamAgreementDto } from './exam-agreement.dto';

export class CreateExamAgreementDto extends ExamAgreementDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anonymouns?: boolean;
}
