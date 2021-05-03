import { ChildEntity } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@ChildEntity()
export class Student extends User {}
