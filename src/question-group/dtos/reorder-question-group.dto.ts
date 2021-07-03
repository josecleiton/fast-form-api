import { IsArray, IsPositive } from 'class-validator';

export class ReorderQuestionGroupDto {
  @IsPositive()
  examId!: number;

  @IsArray()
  @IsPositive({ each: true })
  groupIds!: number[];
}
