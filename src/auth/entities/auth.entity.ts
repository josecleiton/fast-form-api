import { FFEntity } from 'src/core/entities/ff.entity';
import { Column, Entity } from 'typeorm';

@Entity('auth')
export class Auth extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  login!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  salt!: string;
}
