import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { ConfigService } from '@/core/config';

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
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey, 'hex'),
      iv,
    );

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(data: string, encryptionKey: string) {
    const [iv, encryptedText] = data.split(':');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey, 'hex'),
      Buffer.from(iv, 'hex'),
    );

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  generateHash() {
    const randomData = randomBytes(32);

    return createHash('sha256').update(randomData).digest('hex');
  }
}
