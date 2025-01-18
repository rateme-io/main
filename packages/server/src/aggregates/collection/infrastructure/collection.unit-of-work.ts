import {
  CollectionAbstractUnitOfWork,
  CollectionUnitOfWorkContext,
} from '@/aggregates/collection/domain';
import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { DataSource, EntityManager } from 'typeorm';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { UserRepository } from '@/entities/user/infrastructure';
import { CollectionItemRepository } from '@/entities/collection-item/infrastructure';
import { CollectionForkRepository } from '@/entities/collection-fork/infrastructure';
import { CollectionHierarchyRepository } from '@/entities/collection-hierarchy/infrastructure';

@Injectable()
export class CollectionUnitOfWork
  extends TypeormUnitOfWork<CollectionUnitOfWorkContext>
  implements CollectionAbstractUnitOfWork
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): CollectionUnitOfWorkContext {
    const userRepository = new UserRepository(entityManager);
    const collectionRepository = new CollectionRepository(
      entityManager,
      userRepository,
    );
    const collectionItemRepository = new CollectionItemRepository(
      entityManager,
      collectionRepository,
      userRepository,
    );
    const collectionForkRepository = new CollectionForkRepository(
      entityManager,
      collectionRepository,
      userRepository,
    );
    const collectionHierarchyRepository = new CollectionHierarchyRepository(
      entityManager,
      collectionRepository,
      userRepository,
    );

    return {
      userRepository,
      collectionForkRepository,
      collectionRepository,
      collectionHierarchyRepository,
      collectionItemRepository,
    };
  }
}
