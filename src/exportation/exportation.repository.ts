import { CsvLine } from './interfaces/csv-line.interface';
import { getConnection } from 'typeorm';

export class ExportationRepository {
  async getCsvLines(examId: number): Promise<CsvLine[]> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const csvLines = await queryRunner.query(
      `SELECT
          a.score as 'score', qg.id as 'group_id', qg.title as 'group_title',
          qg.class as 'is_class', qg.personal as 'is_personal', q.id as 'question_id',
          q.statement as 'question_statement', u.enrollment as 'user_enrollment',
          ea.anonymous as 'anonymous'
        FROM exam ex
        LEFT JOIN exam_agreement ea
          ON ea.exam_id = ex.id
        LEFT JOIN answer a
          ON a.exam_agreement_id = ea.id
        INNER JOIN user u
          ON u.id = ea.user_id
        LEFT JOIN question_group qg
          ON qg.exam_id = ex.id
        LEFT JOIN question q
          ON q.group_id = qg.id
        WHERE
          ex.id = ? AND
          ex.deleted_at IS NULL
        LIMIT 1`,
      [examId],
    );

    return csvLines.map((csvLine) => {
      return {
        'Grupo de Questões': csvLine.group_title,
        Disciplina: csvLine.is_class ? 'Sim' : 'Não',
        Questão: csvLine.question_statement,
        Matrícula: csvLine.anonymous ? 'Anônimo' : csvLine.user_enrollment,
        Nota: csvLine.score ? csvLine.score : 'Não se aplica',
      };
    });
  }
}
