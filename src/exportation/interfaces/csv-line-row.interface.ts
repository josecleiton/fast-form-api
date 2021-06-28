export interface CsvLineRow {
  score?: string;
  group_id: number;
  group_title: string;
  is_class: boolean;
  is_personal: boolean;
  question_id: number;
  question_statement: string;
  user_enrollment: string;
  user_type: 'Professor' | 'Student' | 'User';
  anonymous: boolean;
  subject_title?: string;
  unique_code: string;
  observation?: string;
}
