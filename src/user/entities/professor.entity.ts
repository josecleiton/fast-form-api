import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity()
export class Professor extends User {}
