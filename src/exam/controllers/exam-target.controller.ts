import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamUser } from '../interfaces/exam-user.interface';
import { ExamTargetService } from '../services/exam-target.service';

@Controller('exam-target')
@ApiTags('ExamTarget')
@UseGuards(JwtGuard)
export class ExamTargetController {
  constructor(private readonly targetService: ExamTargetService) {}

  @Get()
  @ApiOkResponse({
    type: [String],
    schema: { example: Object.values(ExamTargetType) },
  })
  async getTargets(): Promise<ExamTargetType[]> {
    return this.targetService.getTargets();
  }

  @Get('user')
  @ApiExcludeEndpoint()
  getForUser(@GetUser() user: ExamUser) {
    return this.targetService.getTargetsForUser(user.type);
  }
}
