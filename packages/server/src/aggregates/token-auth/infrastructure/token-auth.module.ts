import { Module } from '@nestjs/common';
import { TokenAuthController } from '@/aggregates/token-auth/presentation';
import {
  TokenAuthAbstractService,
  TokenAuthAbstractUnitOfWork,
  TokenAuthService,
} from '@/aggregates/token-auth/domain';
import { CryptoService } from '@/core/modules/crypto';
import { DateService } from '@/core/modules/date';
import { TokenAuthUnitOfWork } from './token-auth.unit-of-wok';
import { ConfigService } from '@/core/modules/config';
import { EntityModule } from '@/core/modules/module-config';

@Module(
  EntityModule.config({
    controllers: [TokenAuthController],
    providers: [
      { provide: TokenAuthAbstractUnitOfWork, useClass: TokenAuthUnitOfWork },
    ],
    exports: [TokenAuthAbstractUnitOfWork],
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
