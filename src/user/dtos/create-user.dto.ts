import { IsEnum } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

import { IsEnrollment } from '../../core/decorators/is-enrollment.decorator';
import { UserType } from '../enum/user-type.enum';
import { CreateAuthDto } from '../../auth/dtos/create-auth.dto';
import { UserRole } from '../enum/user-role.enum';

export class CreateUserDto extends CreateAuthDto {
  @IsCPF()
  cpf: string;

  @IsEnrollment()
  enrollment: string;

  @IsEnum(UserType)
  type: UserType;

  @IsEnum(UserRole)
  role: UserRole;
}
