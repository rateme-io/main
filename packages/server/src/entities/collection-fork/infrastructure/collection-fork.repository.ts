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
      forked:
        entity.forked && this.collectionRepository.toDomain(entity.forked),
      forkedId: entity.forkedId,
      original:
        entity.original && this.collectionRepository.toDomain(entity.original),
      originalId: entity.originalId,
      user: entity.user && this.userRepository.toDomain(entity.user),
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: CollectionForkEntity): CollectionForkRepositoryEntity {
    return CollectionForkRepositoryEntity.create({
      forked:
        entity.forked && this.collectionRepository.toPersistence(entity.forked),
      forkedId: entity.forkedId,
      original:
        entity.original &&
        this.collectionRepository.toPersistence(entity.original),
      originalId: entity.originalId,
      user: entity.user && this.userRepository.toPersistence(entity.user),
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
