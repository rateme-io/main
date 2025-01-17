import { Repository } from '@/core/repository';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';

export abstract class RatingAbstractRepository extends Repository<RatingEntity> {}
