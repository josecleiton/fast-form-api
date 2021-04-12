import { Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('professor')
export class Professor extends User {}
