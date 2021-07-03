import { PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

export class FFEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
