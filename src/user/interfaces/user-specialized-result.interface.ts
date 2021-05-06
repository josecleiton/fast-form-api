import { UserType } from '../enum/user-type.enum';

export interface UserResult {
  readonly type: UserType;
  readonly id: number;
}
