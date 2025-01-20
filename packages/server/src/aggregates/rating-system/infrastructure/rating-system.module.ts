import { Module } from '@nestjs/common';

import { RatingSystemAbstractService } from '@/aggregates/rating-system/domain';
import { RatingSystemController } from '@/aggregates/rating-system/presentation';
import { EntityModule } from '@/core/modules/module-config';

import { RatingSystemService } from './rating-system.service';
import { RatingSystemUnitOfWork } from './rating-system.unit-of-work';

@Module(
  EntityModule.config({
    controllers: [RatingSystemController],
    providers: [RatingSystemUnitOfWork],
    services: [
      {
        abstract: RatingSystemAbstractService,
        realisation: RatingSystemService,
      },
    ],
  }),
)
export class RatingSystemModule {}
