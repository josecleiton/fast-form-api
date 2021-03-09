import { Column, Entity } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';

@Entity('user')
export class User extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;
}
