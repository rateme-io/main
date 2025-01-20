import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { CollectionAbstractRepository } from '@/entities/collection/domain';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { CollectionForkAbstractRepository } from '@/entities/collection-fork/domain';
import { CollectionForkRepository } from '@/entities/collection-fork/infrastructure';
import { CollectionHierarchyAbstractRepository } from '@/entities/collection-hierarchy/domain';
import { CollectionHierarchyRepository } from '@/entities/collection-hierarchy/infrastructure';
import { CollectionItemAbstractRepository } from '@/entities/collection-item/domain';
import { CollectionItemRepository } from '@/entities/collection-item/infrastructure';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from '@/entities/user/infrastructure';

export interface CollectionUnitOfWorkContext {
  userRepository: UserAbstractRepository;
  collectionRepository: CollectionAbstractRepository;
  collectionItemRepository: CollectionItemAbstractRepository;
  collectionForkRepository: CollectionForkAbstractRepository;
  collectionHierarchyRepository: CollectionHierarchyAbstractRepository;
}

@Injectable()
export class CollectionUnitOfWork extends TypeormUnitOfWork<CollectionUnitOfWorkContext> {
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
