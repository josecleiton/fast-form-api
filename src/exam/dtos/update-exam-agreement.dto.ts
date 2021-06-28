import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExamUser } from '../interfaces/exam-user.interface';

export class UpdateExamAgreementDtoQuery {
  @IsPositive()
  examId: number;

  user: ExamUser;
}

export class UpdateExamAgreementDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observation?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anonymous?: boolean;
}
