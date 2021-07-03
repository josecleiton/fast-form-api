import {
  IsEnum,
  IsOptional,
  IsPositive,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { AnswerType } from '../enums/answer-type.enum';

export class CreateAnswerDto {
  @IsOptional()
  @Min(1)
  @Max(5)
  score?: number;

  @IsPositive()
  questionId!: number;

  @IsOptional()
  @IsEnum(AnswerType)
  type: AnswerType = AnswerType.ANSWER;

  @IsPositive()
  @ValidateIf((o: CreateAnswerDto) => o.type === AnswerType.ANSWER_GRADE)
  gradeId?: number;
}
