import { Module } from '@nestjs/common';
import { TokenAuthController } from '@/entities/token-auth/presentation';
import { UserModule } from '@/entities/user/infrastructure';
import {
  PasswordAbstractRepository,
  TokenAbstractRepository,
  TokenAuthAbstractService,
  TokenAuthService,
} from '@/entities/token-auth/domain';
import { UserAbstractRepository } from '@/entities/user/domain';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { CryptoService } from '@/core/crypto';
import { SessionModule } from '@/entities/session/infrastructure';
import { EntityModule } from '@/core/modules';
import { DateService } from '@/core/date';
import { ConfigService } from '@/core/config';
import { PasswordRepository, TokenRepository } from './repositories';
import { PasswordRepositoryEntity, TokenRepositoryEntity } from './entities';

@Module(
  EntityModule.config({
    imports: [UserModule, SessionModule],
    controllers: [TokenAuthController],
    repositories: [
      {
        abstract: PasswordAbstractRepository,
        repository: PasswordRepository,
        entity: PasswordRepositoryEntity,
      },
      {
        abstract: TokenAbstractRepository,
        repository: TokenRepository,
        entity: TokenRepositoryEntity,
      },
    ],
    services: (create) => [
      create({
        abstract: TokenAuthAbstractService,
        inject: [
          UserAbstractRepository,
          PasswordAbstractRepository,
          SessionAbstractRepository,
          TokenAbstractRepository,
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
