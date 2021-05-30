import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateExamAgreementDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observation?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anonymous?: boolean;
}