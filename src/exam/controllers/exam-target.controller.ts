import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamTargetService } from '../services/exam-target.service';

@Controller('exam-target')
@ApiTags('ExamTarget')
export class ExamTargetController {
  constructor(private readonly targetService: ExamTargetService) {}

  @Get()
  @ApiOkResponse({
    type: [String],
    schema: { examples: Object.values(ExamTargetType) },
  })
  async getTargets(): Promise<ExamTargetType[]> {
    return await this.targetService.getTargets();
  }
}
