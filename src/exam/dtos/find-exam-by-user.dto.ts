import { Exam } from '../entities/exam.entity';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamUser } from '../interfaces/exam-user.interface';

export interface FindExamByUserDto {
  user: ExamUser;
  ignoreExams: Exam[];
  targets: ExamTargetType[];
}
