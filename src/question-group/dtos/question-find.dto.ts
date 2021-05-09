import { IsOptional, IsPositive } from 'class-validator';

export class QuestionFindDto {
  @IsPositive()
  @IsOptional()
  groupId?: number;
}
