import {
  RatingSystemAbstractService,
} from './rating-system.abstract.service';
import {
  RatingSystemAbstractUnitOfWork,
} from './rating-system.abstract.unit-of-work';

export class RatingSystemService extends RatingSystemAbstractService {
  constructor(
    private readonly ratingSystemUnitOfWork: RatingSystemAbstractUnitOfWork,
  ) {
    super();
  }

  // methods
}
