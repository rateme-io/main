import { forwardRef, Module } from '@nestjs/common';

import { SessionAbstractService } from '@/aggregates/session/domain';
import { SessionController } from '@/aggregates/session/presentation';
import { AuthModule } from '@/core/modules/auth';
import { EntityModule } from '@/core/modules/module-config';

import { SessionService } from './session.service';
import { SessionUnitOfWork } from './session.unit-of-work';

@Module(
  EntityModule.config({
    imports: [forwardRef(() => AuthModule)],
    controllers: [SessionController],
    providers: [SessionUnitOfWork],
    services: [
      {
        abstract: SessionAbstractService,
        realisation: SessionService,
      },
    ],
  }),
)
export class SessionModule {}
