import { Injectable, NotFoundException } from '@nestjs/common';
import ObjectsToCsv from 'objects-to-csv';

import { ExportationRepository } from './exportation.repository';

import { ExportationType } from './enums/exportation-type.enum';
import { CsvLine } from './interfaces/csv-line.interface';
import { UploaderService } from 'src/infra/services/uploader.service';

@Injectable()
export class ExportationService {
  constructor(
    private readonly repository: ExportationRepository,
    private readonly uploadService: UploaderService,
  ) {}

  private getFileName(
    examId: number,
    exportationType: ExportationType,
  ): string {
    const fileDate = new Date()
      .toLocaleDateString('pt-BR')
      .replace(/\//gu, '-');
    const filePrefix = process.env.EXPORTED_FILE_PREFIX || 'exportation';
    return `${exportationType}_${examId}_${filePrefix}_${fileDate}.csv`;
  }

  private async createCsv(csvLines: CsvLine[]): Promise<Buffer> {
    const builder = new ObjectsToCsv(csvLines);

    return Buffer.from(await builder.toString());
  }

  async exportToCsv(examId: number): Promise<string> {
    const csvLines: CsvLine[] = await this.repository.getCsvLines(examId);

    if (!csvLines.length) {
      throw new NotFoundException('Nothing to export');
    }

    const fileName = this.getFileName(examId, ExportationType.AVALIACAO);
    const data = await this.createCsv(csvLines);

    return this.uploadService.upload(
      {
        buffer: data,
        originalname: fileName,
        mimetype: 'text/csv',
        size: data.length,
        encoding: 'utf8',
        noRandomName: true,
      },
      'exports',
    );
  }
}
