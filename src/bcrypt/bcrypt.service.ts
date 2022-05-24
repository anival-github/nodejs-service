import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

export const SALT_ROUNDS = 10;

@Injectable()
export class BcryptService {
  encript(text: string) {
    const hash = bcrypt.hashSync(text, SALT_ROUNDS);

    return hash;
  }

  compare(text: string, hash: string) {
    const isMatch = bcrypt.compareSync(text, hash);

    return isMatch;
  }
}
