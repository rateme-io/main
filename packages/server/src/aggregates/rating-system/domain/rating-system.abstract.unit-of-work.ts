import { UnitOfWork } from '@/core/unit-of-work';
import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';
import { RatingAbstractRepository } from '@/entities/rating/domain';

export abstract class RatingSystemAbstractUnitOfWork extends UnitOfWork<RatingSystemUnitOfWorkContext> {}

export interface RatingSystemUnitOfWorkContext {
  ratingSystemRepository: RatingSystemAbstractRepository;
  ratingRepository: RatingAbstractRepository;
}
