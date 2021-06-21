import { UserToFind } from 'src/auxiliary/types/user-to-find.type';
import { User } from 'src/user/entities/user.entity';

export class FindPersonalDto {
  examId: number;
  user: UserToFind | User;
}
