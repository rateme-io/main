import { Module } from '@nestjs/common';

import { SessionAbstractService } from '@/aggregates/session/domain';
import { SessionController } from '@/aggregates/session/presentation';
import { EntityModule } from '@/core/modules/module-config';

import { SessionService } from './session.service';
import { SessionUnitOfWork } from './session.unit-of-work';

@Module(
  EntityModule.config({
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
