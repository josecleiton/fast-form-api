import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Exam } from '../entities/exam.entity';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { ExamUser } from '../interfaces/exam-user.interface';
import { ExamPersonalResult } from '../models/exam-personal-result.model';

@Controller('exam')
@ApiTags('Exam')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOkResponse({ type: Exam })
  async create(@Body() createExamDto: CreateExamDto): Promise<Exam> {
    return this.examService.create(createExamDto);
  }

  @Get()
  @ApiOkResponse({ type: [Exam] })
  async findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get('me')
  @ApiOkResponse({ type: ExamPersonalResult })
  async findPersonal(@GetUser() user: ExamUser): Promise<ExamPersonalResult> {
    return this.examService.findPersonal(user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    return this.examService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<Exam> {
    return this.examService.update(id, updateExamDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.examService.remove(id);
  }
}
