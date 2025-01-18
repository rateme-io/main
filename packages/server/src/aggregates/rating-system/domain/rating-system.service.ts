import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import {
  CreateRatingCommand,
  CreateRatingSystemCommand,
  RatingSystemAbstractService,
} from './rating-system.abstract.service';
import { RatingSystemAbstractUnitOfWork } from './rating-system.abstract.unit-of-work';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';

export class RatingSystemService extends RatingSystemAbstractService {
  constructor(
    private readonly ratingSystemUnitOfWork: RatingSystemAbstractUnitOfWork,
  ) {
    super();
  }

  getRatings(): Promise<RatingEntity[]> {
    throw new Error('Method not implemented.');
  }

  createRating(command: CreateRatingCommand): Promise<RatingEntity> {
    throw new Error('Method not implemented.');
  }

  getRatingSystems(): Promise<RatingSystemEntity[]> {
    throw new Error('Method not implemented.');
  }

  createRatingSystem(
    command: CreateRatingSystemCommand,
  ): Promise<RatingSystemEntity> {
    throw new Error('Method not implemented.');
  }
}
