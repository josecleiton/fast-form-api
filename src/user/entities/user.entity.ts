import { Column, Entity } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { UserType } from '../enum/user-type.enum';

@Entity('user')
export class User extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  enrollment: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'enum', default: UserType.STUDENT })
  type: UserType;
}
