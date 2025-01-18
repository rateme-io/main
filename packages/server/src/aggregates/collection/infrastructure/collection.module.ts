import { Module } from '@nestjs/common';
import { CollectionController } from '@/aggregates/collection/presentation';
import {
  CollectionAbstractService,
  CollectionAbstractUnitOfWork,
  CollectionService,
} from '@/aggregates/collection/domain';
import { CollectionUnitOfWork } from './collection.unit-of-work';
import { EntityModule } from '@/core/modules/module-config';
import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';
import { JsonSchemaService } from '@/core/modules/json-schema';

@Module(
  EntityModule.config({
    imports: [TokenAuthModule],
    controllers: [CollectionController],
    providers: [
      { provide: CollectionAbstractUnitOfWork, useClass: CollectionUnitOfWork },
    ],
    services: (create) => [
      create({
        abstract: CollectionAbstractService,
        inject: [CollectionAbstractUnitOfWork, JsonSchemaService] as const,
        serviceFactory: (...inject) => new CollectionService(...inject),
      }),
    ],
  }),
)
export class CollectionModule {}
