import { Repository } from '@/core/repository';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';

export abstract class RatingSystemAbstractRepository extends Repository<RatingSystemEntity> {}
