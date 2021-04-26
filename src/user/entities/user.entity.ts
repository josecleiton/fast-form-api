import { ExamAgreement } from 'src/exam/entities/agreement.entity';
import { Column, Entity, OneToMany, TableInheritance } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { UserType } from '../enum/user-type.enum';

@Entity('user')
@TableInheritance({ column: { type: 'enum', name: 'type' } })
export class User extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  enrollment: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ default: UserType.STUDENT })
  type: UserType;

  @OneToMany(
    () => ExamAgreement,
    examAgreement => examAgreement.user
  )
  examAgreements: ExamAgreement[]
}
