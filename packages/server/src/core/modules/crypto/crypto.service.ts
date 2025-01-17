import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { ConfigService } from '@/core/modules/config';

const IV_LENGTH = 16;

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  hash(source: string) {
    return argon2.hash(source);
  }

  verify(hash: string, source: string) {
    return argon2.verify(hash, source);
  }

  encrypt(data: string, encryptionKey: string) {
    const key = Buffer.from(encryptionKey, 'hex');

    if (key.length !== 32) {
      throw new Error('Encryption key must be 256 bits (32 bytes) long');
    }

    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(data: string, encryptionKey: string) {
    const key = Buffer.from(encryptionKey, 'hex');

    if (key.length !== 32) {
      throw new Error('Encryption key must be 256 bits (32 bytes) long');
    }

    const [iv, encryptedText] = data.split(':');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      key,
      Buffer.from(iv, 'hex'),
    );

    return (
      decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8')
    );
  }

  generateHash() {
    const randomData = randomBytes(32);

    return createHash('sha256').update(randomData).digest('hex');
  }
}
