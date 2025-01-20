import { CollectionHierarchyEntity } from '@rateme/core/domain/entities/collection-hierarchy.entity';

import { Repository } from '@/core/repository';

export abstract class CollectionHierarchyAbstractRepository extends Repository<CollectionHierarchyEntity> {}
