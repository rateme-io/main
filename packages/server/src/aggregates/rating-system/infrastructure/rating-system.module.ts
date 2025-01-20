import { Module } from '@nestjs/common';
import { RatingSystemController } from '@/aggregates/rating-system/presentation';
import { RatingSystemAbstractService } from '@/aggregates/rating-system/domain';
import { RatingSystemUnitOfWork } from './rating-system.unit-of-work';
import { EntityModule } from '@/core/modules/module-config';
import { RatingSystemService } from './rating-system.service';

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
