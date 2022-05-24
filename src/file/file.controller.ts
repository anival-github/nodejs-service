import { FileService } from './file.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  saveFile(@UploadedFile() file) {
    return this.fileService.saveFile(file);
  }
}
