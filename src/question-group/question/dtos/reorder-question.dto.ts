import { IsArray, IsPositive } from "class-validator";

export class ReorderQuestionDto {
  @IsPositive()
  groupId: number;

  @IsArray()
  @IsPositive({each: true})
  questionIds: number[];
}