import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { render } from 'mustache';
import { basename, join } from 'path';

@Injectable()
export class TemplateService {
  private readonly templateMap: ReadonlyMap<string, string>;

  constructor() {
    const basePath = join(__dirname, '..', '..', '..', 'views');
    const extRe = /.+\.mustache$/u;

    this.templateMap = new Map<string, string>(
      readdirSync(basePath)
        .filter((file) => file.match(extRe))
        .map((file) => [
          basename(file, '.mustache'),
          readFileSync(join(basePath, file), 'utf-8'),
        ]),
    );
  }

  get<T = unknown>(name: string, vars: T): string {
    const template = this.templateMap.get(name);
    if (!template) {
      throw new InternalServerErrorException('Template not supported');
    }

    return render(template, vars);
  }
}
