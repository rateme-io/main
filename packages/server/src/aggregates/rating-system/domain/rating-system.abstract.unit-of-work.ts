import { UnitOfWork } from '@/core/unit-of-work';

export abstract class RatingSystemAbstractUnitOfWork extends UnitOfWork<RatingSystemUnitOfWorkContext> {}

export interface RatingSystemUnitOfWorkContext {
  // repositories
}
