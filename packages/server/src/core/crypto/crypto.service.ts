import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@/core/config';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  hash(source: string) {
    return argon2.hash(source);
  }

  verify(hash: string, source: string) {
    return argon2.verify(hash, source);
  }

  generateHash() {
    const randomData = randomBytes(32);

    return createHash('sha256').update(randomData).digest('hex');
  }

  generateJwt({
    data,
    expiresIn,
  }: {
    data: Record<string, unknown>;
    expiresIn: string | number;
  }) {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(
        data,
        this.configService.privateKey,
        { algorithm: 'RS256', expiresIn },
        (error, encoded) => {
          if (encoded) {
            resolve(encoded);
            return;
          }

          reject(error);
        },
      );
    });
  }
}
