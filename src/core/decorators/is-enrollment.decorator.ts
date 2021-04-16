import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { enrollmentLength } from '../core.constants';

export function IsEnrollment() {
  return applyDecorators(IsString(), IsNotEmpty(), Length(...enrollmentLength));
}
