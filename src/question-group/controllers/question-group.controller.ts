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
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';

import { QuestionGroupService } from '../services/question-group.service';
import { CreateQuestionGroupDto } from '../dtos/create-question-group.dto';
import { UpdateQuestionGroupDto } from '../dtos/update-question-group.dto';
import { QuestionGroup } from '../entities/question-group.entity';
import { CopyQuestionGroupDto } from '../dtos/copy-question-group.dto';
import { ReorderQuestionGroupDto } from '../dtos/reorder-question-group.dto';
import { QuestionGroupTarget } from '../enums/question-group-target.enum';

@Controller('question-group')
@ApiTags('QuestionGroup')
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

  @Get('target')
  @ApiOkResponse({ type: [() => QuestionGroupTarget] })
  getTarget(): QuestionGroupTarget[] {
    return this.questionGroupService.getTargets();
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

  @Put()
  @ApiOkResponse({ type: QuestionGroup })
  @ApiNotFoundResponse()
  async copy(
    @Body() copyQuestionGroupDto: CopyQuestionGroupDto,
  ): Promise<QuestionGroup> {
    return await this.questionGroupService.copy(copyQuestionGroupDto);
  }

  @Patch()
  @ApiOkResponse({ type: [QuestionGroup] })
  async reorder(
    @Body() reorderQuestionGroupDto: ReorderQuestionGroupDto,
  ): Promise<QuestionGroup[]> {
    return await this.questionGroupService.reorder(reorderQuestionGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionGroupService.remove(id);
  }
}
