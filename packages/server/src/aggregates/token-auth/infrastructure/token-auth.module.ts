import { Module } from '@nestjs/common';
import { TokenAuthController } from '@/aggregates/token-auth/presentation';
import { TokenAuthAbstractService } from '@/aggregates/token-auth/domain';
import { TokenAuthUnitOfWork } from './token-auth.unit-of-wok';
import { EntityModule } from '@/core/modules/module-config';
import { TokenAuthService } from './token-auth.service';

@Module(
  EntityModule.config({
    controllers: [TokenAuthController],
    providers: [TokenAuthUnitOfWork],
    services: [
      { abstract: TokenAuthAbstractService, realisation: TokenAuthService },
    ],
  }),
)
export class TokenAuthModule {}
