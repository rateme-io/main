import { Module } from '@nestjs/common';
import { CollectionController } from '@/aggregates/collection/presentation';
import { CollectionAbstractService } from '@/aggregates/collection/domain';
import { CollectionUnitOfWork } from './collection.unit-of-work';
import { EntityModule } from '@/core/modules/module-config';
import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';
import { CollectionService } from './collection.service';

@Module(
  EntityModule.config({
    imports: [TokenAuthModule],
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
