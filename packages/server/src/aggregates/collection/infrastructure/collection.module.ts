import { Module } from '@nestjs/common';

import { CollectionAbstractService } from '@/aggregates/collection/domain';
import { CollectionController } from '@/aggregates/collection/presentation';
import { PasswordAuthModule } from '@/aggregates/password-auth/infrastructure';
import { EntityModule } from '@/core/modules/module-config';

import { CollectionService } from './collection.service';
import { CollectionUnitOfWork } from './collection.unit-of-work';

@Module(
  EntityModule.config({
    imports: [PasswordAuthModule],
    controllers: [CollectionController],
    providers: [CollectionUnitOfWork],
    services: [
      {
        abstract: CollectionAbstractService,
        realisation: CollectionService,
      },
    ],
  }),
)
export class CollectionModule {}
