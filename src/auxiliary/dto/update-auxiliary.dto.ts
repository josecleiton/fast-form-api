import { PartialType } from '@nestjs/mapped-types';
import { CreateAuxiliaryDto } from './create-auxiliary.dto';

export class UpdateAuxiliaryDto extends PartialType(CreateAuxiliaryDto) {}
