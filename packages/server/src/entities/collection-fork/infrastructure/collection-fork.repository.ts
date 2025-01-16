import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { CollectionForkAbstractRepository } from '@/entities/collection-fork/domain';
import { CollectionForkRepositoryEntity } from './collection-fork.repository.entity';
import { CollectionForkEntity } from '@rateme/core/domain/entities/collection-fork.entity';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { TypeormRepository } from '@/core/repository/typeorm.repository';

export class CollectionForkRepository
  extends TypeormRepository<
    CollectionForkEntity,
    CollectionForkRepositoryEntity
  >
  implements CollectionForkAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, CollectionForkRepositoryEntity);
  }

  toDomain(entity: CollectionForkRepositoryEntity): CollectionForkEntity {
    return CollectionForkEntity.create({
      forked: this.collectionRepository.toDomain(entity.forked),
      original: this.collectionRepository.toDomain(entity.original),
      user: this.userRepository.toDomain(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: CollectionForkEntity): CollectionForkRepositoryEntity {
    return CollectionForkRepositoryEntity.create({
      forked: this.collectionRepository.toPersistence(entity.forked),
      original: this.collectionRepository.toPersistence(entity.original),
      user: this.userRepository.toPersistence(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
