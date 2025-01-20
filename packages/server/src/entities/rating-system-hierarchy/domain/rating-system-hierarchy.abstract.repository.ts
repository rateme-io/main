import { RatingSystemHierarchyEntity } from '@rateme/core/domain/entities/rating-system-hierarchy.entity';

import { Repository } from '@/core/repository';

export abstract class RatingSystemHierarchyAbstractRepository extends Repository<RatingSystemHierarchyEntity> {}
