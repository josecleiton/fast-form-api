import { IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../auth.constants';
import { AuthDto } from './auth.dto';

export class LoginDto extends AuthDto {
  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
