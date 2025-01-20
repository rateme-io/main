import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { DataSource, EntityManager } from 'typeorm';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';
import { RatingRepository } from '@/entities/rating/infrastructure';
import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';
import { RatingAbstractRepository } from '@/entities/rating/domain';

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
