import { Module } from '@nestjs/common';
import { RatingSystemController } from '@/aggregates/rating-system/presentation';
import {
  RatingSystemAbstractService,
  RatingSystemAbstractUnitOfWork,
  RatingSystemService,
} from '@/aggregates/rating-system/domain';
import { RatingSystemUnitOfWork } from './rating-system.unit-of-work';
import { EntityModule } from '@/core/modules/module-config';
import { JsonSchemaService } from '@/core/modules/json-schema';

@Module(
  EntityModule.config({
    controllers: [RatingSystemController],
    providers: [
      {
        provide: RatingSystemAbstractUnitOfWork,
        useClass: RatingSystemUnitOfWork,
      },
    ],
    services: (create) => [
      create({
        abstract: RatingSystemAbstractService,
        inject: [RatingSystemAbstractUnitOfWork, JsonSchemaService] as const,
        serviceFactory: (...inject) => new RatingSystemService(...inject),
      }),
    ],
  }),
)
export class RatingSystemModule {}
