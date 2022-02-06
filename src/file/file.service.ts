import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileService {
  saveFile(file): string {
    try {
      const { originalname = '' } = file || {};
      const nameSplitedByChunks = originalname.split('.');

      const extension = nameSplitedByChunks[nameSplitedByChunks.length - 1];

      const filename = uuid.v4() + '.' + extension;
      const filePath = path.resolve(__dirname, '..', '..', 'static');

      console.log(file);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, filename), file.buffer);

      return filename;
    } catch (error) {
      throw new HttpException(
        'Error while saving file occured',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
