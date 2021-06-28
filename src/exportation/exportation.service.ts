import { Injectable, NotFoundException } from '@nestjs/common';
import ObjectsToCsv from 'objects-to-csv';

import { ExportationRepository } from './exportation.repository';

import { ExportationType } from './enums/exportation-type.enum';
import { CsvLine } from './interfaces/csv-line.interface';
import { FirebaseStorageService } from 'src/firebase';

@Injectable()
export class ExportationService {
  constructor(
    private readonly repository: ExportationRepository,
    private readonly firebaseStorage: FirebaseStorageService,
  ) {}

  private getFileName(exportationType: ExportationType): string {
    const fileDate = new Date()
      .toLocaleDateString('pt-BR')
      .replace(/\//gu, '-');
    const filePrefix = process.env.EXPORTED_FILE_PREFIX || 'exportation';
    return `${exportationType}_${filePrefix}_${fileDate}.csv`;
  }

  private async createCsv(csvLines: Array<CsvLine>): Promise<Buffer> {
    const builder = new ObjectsToCsv(csvLines);

    return Buffer.from(await builder.toString());
  }

  async exportToCsv(examId: number) {
    const csvLines: CsvLine[] = await this.repository.getCsvLines(examId);

    if (!csvLines.length) {
      throw new NotFoundException('Nothing to export');
    }

    const fileName = this.getFileName(ExportationType.AVALIACAO);
    const data = await this.createCsv(csvLines);

    return this.firebaseStorage.upload(`exports/${fileName}`, {
      data,
      contentType: 'text/csv',
      publicFile: true,
    });
  }
}
