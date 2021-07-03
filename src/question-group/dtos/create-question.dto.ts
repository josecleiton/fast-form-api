import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  statement!: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageAlt?: string;

  @ApiProperty({
    type: Boolean,
    title:
      'Questão pode não ser obrigatória. Se essa propriedade não for fornecida, ela é verdadeira por padrão',
  })
  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsPositive()
  groupId!: number;
}
