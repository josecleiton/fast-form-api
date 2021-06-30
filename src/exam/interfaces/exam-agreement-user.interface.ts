export interface ExamAgreementUser {
  id: number;
  hasGrade(): boolean;
  email?: string;
}
