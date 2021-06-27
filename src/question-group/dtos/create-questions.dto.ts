import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

class CreateQuestion extends OmitType(CreateQuestionDto, ['groupId']) {
  @IsOptional()
  @IsPositive()
  id?: number;
}

export class CreateQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestion)
  @IsDefined({ each: true })
  @ArrayMinSize(1)
  questions: CreateQuestion[];
}
