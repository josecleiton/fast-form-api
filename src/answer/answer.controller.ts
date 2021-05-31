import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Controller('answer')
@ApiTags('Answer')
@ApiBearerAuth()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('batch')
  @ApiOkResponse({ type: [CreateAnswerDto] })
  async create(
    @Body(new ParseArrayPipe({ items: CreateAnswerDto }))
    createAnswerDtos: CreateAnswerDto[],
  ) {
    return await this.answerService.createBatch(createAnswerDtos);
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    return await this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.answerService.remove(id);
  }
}
