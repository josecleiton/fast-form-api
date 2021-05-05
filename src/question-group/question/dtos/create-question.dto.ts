import {
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  imageAlt: string;

  @IsBoolean()
  required: boolean;

  @IsPositive()
  groupId: number;
}
