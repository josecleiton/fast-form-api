import { CsvLine } from './interfaces/csv-line.interface';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CsvLineRow } from './interfaces/csv-line-row.interface';
import { userTypeMap } from './maps/user-type.map';

@Injectable()
export class ExportationRepository {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getCsvLines(examId: number): Promise<CsvLine[]> {
    const queryRunner = this.connection.createQueryRunner();

    const csvLines: CsvLineRow[] = await queryRunner.query(
      `
        SELECT DISTINCT
            a.score AS 'score',
            qg.id AS 'group_id',
            qg.title AS 'group_title',
            qg.class AS 'is_class',
            qg.personal AS 'is_personal',
            q.id AS 'question_id',
            q.statement AS 'question_statement',
            u.enrollment AS 'user_enrollment',
            u.type AS 'user_type',
            ea.id AS 'exam_agreement_id',
            ea.anonymous AS 'anonymous',
            ea.observation AS 'observation',
            ea.uuid AS 'unique_code',
            s.title AS 'subject_title'
        FROM
            exam ex
        INNER JOIN exam_agreement ea ON
            ea.exam_id = ex.id
        INNER JOIN user u ON
            u.id = ea.user_id
        INNER JOIN answer a ON
            a.exam_agreement_id = ea.id
        LEFT JOIN grade ON
            grade.id = a.grade_id
        LEFT JOIN subject s ON
            s.id = grade.subject_id
        INNER JOIN question_group qg ON
            qg.exam_id = ex.id
        INNER JOIN question q ON
            q.group_id = qg.id
        WHERE
            ex.id = ? AND
            ex.deleted_at IS NULL
        ORDER BY
            ea.id ASC, qg.id ASC, q.id ASC
      `,
      [examId],
    );

    return csvLines.map((csvLine) => {
      return {
        'Grupo de Questões': csvLine.group_title,
        Disciplina: csvLine.subject_title,
        Pessoal: csvLine.is_personal ? 'Sim' : 'Não',
        Questão: csvLine.question_statement,
        Matrícula: csvLine.anonymous ? 'Anônimo' : csvLine.user_enrollment,
        'Tipo de Usuário': userTypeMap.get(csvLine.user_type)!,
        Nota: csvLine.score ?? 'Não se aplica',
        Observação: csvLine.observation,
        'Código Único': csvLine.unique_code,
      };
    });
  }
}
