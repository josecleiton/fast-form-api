import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;
}
