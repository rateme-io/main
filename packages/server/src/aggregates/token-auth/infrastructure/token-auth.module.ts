import { Module } from '@nestjs/common';
import { TokenAuthController } from '@/aggregates/token-auth/presentation';
import {
  TokenAuthAbstractService,
  TokenAuthAbstractUnitOfWork,
  TokenAuthService,
} from '@/aggregates/token-auth/domain';
import { CryptoService } from '@/core/crypto';
import { EntityModule } from '@/core/modules';
import { DateService } from '@/core/date';
import { ConfigService } from '@/core/config';
import { TokenAuthUnitOfWork } from './token-auth.unit-of-wok';

@Module(
  EntityModule.config({
    controllers: [TokenAuthController],
    providers: [
      { provide: TokenAuthAbstractUnitOfWork, useClass: TokenAuthUnitOfWork },
    ],
    services: (create) => [
      create({
        abstract: TokenAuthAbstractService,
        inject: [
          TokenAuthAbstractUnitOfWork,
          CryptoService,
          DateService,
          ConfigService,
        ] as const,
        serviceFactory: (...inject) => new TokenAuthService(...inject),
      }),
    ],
  }),
)
export class TokenAuthModule {}
