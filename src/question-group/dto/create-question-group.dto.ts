import { IsBoolean, IsString } from 'class-validator';

export class CreateQuestionGroupDto {
  @IsString()
  title: string;

  @IsBoolean()
  class: boolean;
}
