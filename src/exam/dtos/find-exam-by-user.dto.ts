import { Exam } from '../entities/exam.entity';
import { ExamTargetType } from '../enums/exam-target-type.enum';
export interface FindExamByUserDto {
  ignoreExams: Exam[];
  targets: ExamTargetType[];
}
