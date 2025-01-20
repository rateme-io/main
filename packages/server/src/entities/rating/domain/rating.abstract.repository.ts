import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';

import { Repository } from '@/core/repository';

export abstract class RatingAbstractRepository extends Repository<RatingEntity> {
  abstract findAll(): Promise<RatingEntity[]>;

  abstract create(entity: RatingEntity): Promise<RatingEntity>;
}
