import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuxiliaryService } from './auxiliary.service';
import { CreateAuxiliaryDto } from './dto/create-auxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/update-auxiliary.dto';

@Controller('auxiliary')
export class AuxiliaryController {
  constructor(private readonly auxiliaryService: AuxiliaryService) {}

  @Post()
  create(@Body() createAuxiliaryDto: CreateAuxiliaryDto) {
    return this.auxiliaryService.create(createAuxiliaryDto);
  }

  @Get()
  findAll() {
    return this.auxiliaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auxiliaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuxiliaryDto: UpdateAuxiliaryDto) {
    return this.auxiliaryService.update(+id, updateAuxiliaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auxiliaryService.remove(+id);
  }
}
