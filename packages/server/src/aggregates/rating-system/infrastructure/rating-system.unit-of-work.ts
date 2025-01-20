import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { RatingAbstractRepository } from '@/entities/rating/domain';
import { RatingRepository } from '@/entities/rating/infrastructure';
import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';

export interface RatingSystemUnitOfWorkContext {
  ratingSystemRepository: RatingSystemAbstractRepository;
  ratingRepository: RatingAbstractRepository;
}

@Injectable()
export class RatingSystemUnitOfWork extends TypeormUnitOfWork<RatingSystemUnitOfWorkContext> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): RatingSystemUnitOfWorkContext {
    const ratingSystemRepository = new RatingSystemRepository(entityManager);
    const ratingRepository = new RatingRepository(entityManager);

    return {
      ratingSystemRepository,
      ratingRepository,
    };
  }
}
