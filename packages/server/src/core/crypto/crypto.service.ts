import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class CryptoService {
  hash(source: string) {
    return argon2.hash(source);
  }

  verify(hash: string, source: string) {
    return argon2.verify(hash, source);
  }
}
