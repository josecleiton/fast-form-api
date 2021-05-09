import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateQuestionGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  class?: boolean;

  @IsOptional()
  @IsBoolean()
  personal?: boolean;

  @IsOptional()
  @IsPositive()
  examId?: number;
}
