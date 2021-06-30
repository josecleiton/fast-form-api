import { ExamAgreement } from 'src/exam/entities/exam-agreement.entity';

export interface SendAgreementEmailDto {
  user: { email: string };
  agreement: ExamAgreement;
}
