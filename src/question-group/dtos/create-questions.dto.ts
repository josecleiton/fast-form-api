import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

class CreateQuestion extends OmitType(CreateQuestionDto, ['groupId']) {}

export class CreateQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestion)
  @IsDefined({ each: true })
  @ArrayMinSize(1)
  questions: CreateQuestion[];
}
