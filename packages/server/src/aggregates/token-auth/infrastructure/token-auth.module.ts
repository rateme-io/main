import { Module } from '@nestjs/common';

import { TokenAuthAbstractService } from '@/aggregates/token-auth/domain';
import { TokenAuthController } from '@/aggregates/token-auth/presentation';
import { EntityModule } from '@/core/modules/module-config';

import { TokenAuthService } from './token-auth.service';
import { TokenAuthUnitOfWork } from './token-auth.unit-of-work';
import { SessionUnitOfWork } from '@/aggregates/session/infrastructure';

@Module(
  EntityModule.config({
    controllers: [TokenAuthController],
    providers: [TokenAuthUnitOfWork, SessionUnitOfWork],
    services: [
      { abstract: TokenAuthAbstractService, realisation: TokenAuthService },
    ],
  }),
)
export class TokenAuthModule {}
