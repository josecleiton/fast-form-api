import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UploaderService } from '../services/uploader.service';

@Controller('upload')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly service: UploaderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.service.upload(file);
  }
}