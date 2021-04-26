import { Column, Entity, TableInheritance } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { UserRole } from '../enum/user-role.enum';
import { UserType } from '../enum/user-type.enum';

@Entity('user')
@TableInheritance({ column: { type: 'enum', name: 'type' } })
export class User extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  enrollment: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column()
  type: UserType;

  @Column({ type: 'enum', default: UserRole.REGULAR, enum: UserRole })
  role: UserRole;
}
