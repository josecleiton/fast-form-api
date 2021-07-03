import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExamTargetType } from '../enums/exam-target-type.enum';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDate()
  @Type(() => Date)
  startedAt!: Date;

  @IsDate()
  @Type(() => Date)
  endedAt!: Date;

  @IsOptional()
  @IsBoolean()
  allowAnonymous?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(ExamTargetType, { each: true })
  targets?: ExamTargetType[];
}
