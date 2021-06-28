import { Injectable, NotFoundException } from '@nestjs/common';
import csvBuilder from 'objects-to-csv';

import { ExportationRepository } from './exportation.repository';

import { ExportationType } from './enums/exportation-type.enum'
import { CsvLine } from './interfaces/csv-line.interface';

@Injectable()
export class ExportationService {

  constructor(
    private readonly repository: ExportationRepository,
  ) {}

  private getFileName(exportationType: ExportationType): String {
    const fileDate = new Date().toLocaleDateString('pt-BR').replace(/\//g, "-");
    const filePrefix = process.env.EXPORTED_FILE_PREFIX || 'exportation';
    return `${exportationType}_${filePrefix}_${fileDate}.csv`;
  }

  private async createCsv(csvLines: Array<CsvLine>, exportationType: ExportationType): Promise<String> {
    if (!csvLines.length) {
      throw new NotFoundException('Nothing to export');
    };
    
    const fileName = this.getFileName(exportationType);
    const builder = await csvBuilder(csvLines);
 
    await builder.toDisk(fileName, {
      allColumns: true
    });

    return fileName; 
  }

  async exportToCsv(examId: number) { 
    const csvLines: Array<CsvLine> = await this.repository.getCsvLines(examId)
    return this.createCsv(csvLines, ExportationType.AVALIACAO);
  }

}