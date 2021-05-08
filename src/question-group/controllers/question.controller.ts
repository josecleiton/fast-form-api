import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';

import { CreateQuestionDto } from '../question/dtos/create-question.dto';
import { QuestionFindDto } from '../question/dtos/question-find.dto';
import { UpdateQuestionDto } from '../question/dtos/update-question.dto';
import { Question } from '../question/entities/question.entity';
import { QuestionService } from '../question/question.service';
import { QuestionGroupService } from '../services/question-group.service';

@Controller('question')
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
    if (createQuestionDto.groupId) {
      await this.questionGroupService.findOne(createQuestionDto.groupId);
    }
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
    if (updateQuestionDto.groupId) {
      await this.questionGroupService.findOne(updateQuestionDto.groupId);
    }

    return await this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionService.remove(id);
  }
}
