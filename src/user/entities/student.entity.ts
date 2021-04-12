import { Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('student')
export class Student extends User {}
