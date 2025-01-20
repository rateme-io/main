import { RatingSystemForkEntity } from '@rateme/core/domain/entities/rating-system-fork.entity';

import { Repository } from '@/core/repository';

export abstract class RatingSystemForkAbstractRepository extends Repository<RatingSystemForkEntity> {}
