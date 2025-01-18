import { UnitOfWork } from '@/core/unit-of-work';
import { CollectionAbstractRepository } from '@/entities/collection/domain';
import { CollectionForkAbstractRepository } from '@/entities/collection-fork/domain';
import { CollectionHierarchyAbstractRepository } from '@/entities/collection-hierarchy/domain';
import { CollectionItemAbstractRepository } from '@/entities/collection-item/domain';
import { UserAbstractRepository } from '@/entities/user/domain';

export abstract class CollectionAbstractUnitOfWork extends UnitOfWork<CollectionUnitOfWorkContext> {}

export interface CollectionUnitOfWorkContext {
  userRepository: UserAbstractRepository;
  collectionRepository: CollectionAbstractRepository;
  collectionItemRepository: CollectionItemAbstractRepository;
  collectionForkRepository: CollectionForkAbstractRepository;
  collectionHierarchyRepository: CollectionHierarchyAbstractRepository;
}
