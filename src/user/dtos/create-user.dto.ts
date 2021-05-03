import { IsEnum } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { PickType } from '@nestjs/swagger';

import { IsEnrollment } from '../../core/decorators/is-enrollment.decorator';
import { UserType } from '../enum/user-type.enum';
import { CreateAuthDto } from '../../auth/dtos/create-auth.dto';
import { UserRole } from '../enum/user-role.enum';

export class CreateUserDto extends PickType(CreateAuthDto, ['password']) {
  @IsCPF()
  cpf: string;

  @IsEnrollment()
  enrollment: string;

  @IsEnum(UserType)
  type: UserType;

  @IsEnum(UserRole)
  role: UserRole;
}
