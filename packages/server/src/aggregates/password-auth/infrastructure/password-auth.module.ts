import { Module } from '@nestjs/common';

import { PasswordAuthAbstractService } from '@/aggregates/password-auth/domain';
import { PasswordAuthController } from '@/aggregates/password-auth/presentation';
import { SessionUnitOfWork } from '@/aggregates/session/infrastructure';
import { EntityModule } from '@/core/modules/module-config';

import { PasswordAuthService } from './password-auth.service';
import { PasswordAuthUnitOfWork } from './password-auth.unit-of-work';

@Module(
  EntityModule.config({
    controllers: [PasswordAuthController],
    providers: [PasswordAuthUnitOfWork, SessionUnitOfWork],
    services: [
      {
        abstract: PasswordAuthAbstractService,
        realisation: PasswordAuthService,
      },
    ],
  }),
)
export class PasswordAuthModule {}
