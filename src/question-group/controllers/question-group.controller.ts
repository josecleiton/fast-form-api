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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';

import { QuestionGroupService } from '../services/question-group.service';
import { CreateQuestionGroupDto } from '../dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from '../dto/update-question-group.dto';
import { QuestionGroup } from '../entities/question-group.entity';

@Controller('question-group')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class QuestionGroupController {
  constructor(private readonly questionGroupService: QuestionGroupService) {}

  @Post()
  @ApiOkResponse({ type: QuestionGroup })
  async create(
    @Body() createQuestionGroupDto: CreateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    return await this.questionGroupService.create(createQuestionGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: [QuestionGroup] })
  async findAll(): Promise<QuestionGroup[]> {
    return await this.questionGroupService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: QuestionGroup })
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<QuestionGroup> {
    return await this.questionGroupService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: QuestionGroup })
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionGroupDto: UpdateQuestionGroupDto,
  ): Promise<QuestionGroup> {
    return await this.questionGroupService.update(id, updateQuestionGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionGroupService.remove(id);
  }
}