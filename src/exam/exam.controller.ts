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
import { ExamService } from './exam.service';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Exam } from './entities/exam.entity';

@Controller('exam')
@ApiTags('Exam')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOkResponse({ type: Exam })
  async create(@Body() createExamDto: CreateExamDto): Promise<Exam> {
    return await this.examService.create(createExamDto);
  }

  @Get()
  @ApiOkResponse({ type: [Exam] })
  async findAll(): Promise<Exam[]> {
    return await this.examService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    return await this.examService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<Exam> {
    return await this.examService.update(id, updateExamDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.examService.remove(id);
  }
}
