import { IsPositive } from 'class-validator';

export class CopyQuestionGroupDto {
  @IsPositive()
  groupId: number;

  @IsPositive()
  examId: number;
}
