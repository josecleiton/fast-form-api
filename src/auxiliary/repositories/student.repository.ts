import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Student } from '../entities/student.entity';

@EntityRepository(Student)
export class StudentRepository extends BaseRepository<Student> {}
