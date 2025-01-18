import { Module } from '@nestjs/common';
import { RatingSystemController } from '@/aggregates/rating-system/presentation';
import {
  RatingSystemAbstractService,
  RatingSystemAbstractUnitOfWork,
  RatingSystemService,
} from '@/aggregates/rating-system/domain';
import { RatingSystemUnitOfWork } from './rating-system.unit-of-work';
import { EntityModule } from '@/core/modules/module-config';

@Module(
  EntityModule.config({
    controllers: [RatingSystemController],
    providers: [
      { provide: RatingSystemAbstractUnitOfWork, useClass: RatingSystemUnitOfWork },
    ],
    services: (create) => [
      create({
        abstract: RatingSystemAbstractService,
        inject: [
          RatingSystemAbstractUnitOfWork,
        ] as const,
        serviceFactory: (...inject) => new RatingSystemService(...inject),
      }),
    ],
  }),
)
export class RatingSystemModule {}
