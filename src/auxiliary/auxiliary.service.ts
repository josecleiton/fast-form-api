import { Injectable } from '@nestjs/common';
import { CreateAuxiliaryDto } from './dto/create-auxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/update-auxiliary.dto';

@Injectable()
export class AuxiliaryService {
  create(createAuxiliaryDto: CreateAuxiliaryDto) {
    return 'This action adds a new auxiliary';
  }

  findAll() {
    return `This action returns all auxiliary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auxiliary`;
  }

  update(id: number, updateAuxiliaryDto: UpdateAuxiliaryDto) {
    return `This action updates a #${id} auxiliary`;
  }

  remove(id: number) {
    return `This action removes a #${id} auxiliary`;
  }
}
