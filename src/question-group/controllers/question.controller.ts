import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';

import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionFindDto } from '../dtos/question-find.dto';
import { ReorderQuestionDto } from '../dtos/reorder-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';
import { QuestionGroupService } from '../services/question-group.service';

@Controller('question')
@ApiTags('Question')
@UseGuards(JwtGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionGroupService: QuestionGroupService,
  ) {}

  @Post()
  @ApiOkResponse({ type: Question })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionService.createQuestion(createQuestionDto);
  }

  @Get()
  @ApiOkResponse({ type: [Question] })
  async find(@Query() findDto: QuestionFindDto) {
    return await this.questionService.find(findDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: Question })
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return await this.questionService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: Question })
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.questionService.update(id, updateQuestionDto);
  }

  @Patch()
  @ApiOkResponse({ type: [Question] })
  async reorder(
    @Body() reorderQuesitonDto: ReorderQuestionDto,
  ): Promise<Question[]> {
    return await this.questionService.reorder(reorderQuesitonDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionService.remove(id);
  }
}
