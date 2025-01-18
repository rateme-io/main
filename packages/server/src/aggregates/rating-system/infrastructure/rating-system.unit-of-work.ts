import {
  RatingSystemAbstractUnitOfWork,
  RatingSystemUnitOfWorkContext,
} from '@/aggregates/rating-system/domain';
import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class RatingSystemUnitOfWork
  extends TypeormUnitOfWork<RatingSystemUnitOfWorkContext>
  implements RatingSystemAbstractUnitOfWork
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): RatingSystemUnitOfWorkContext {
    return {
      // repositories
    };
  }
}
