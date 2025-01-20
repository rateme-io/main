import { Repository } from '@/core/repository';
import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';

export abstract class CollectionAbstractRepository extends Repository<CollectionEntity> {
  abstract create(entity: CollectionEntity): Promise<CollectionEntity>;

  abstract findById(id: string): Promise<CollectionEntity | null>;

  abstract findAll(): Promise<CollectionEntity[]>;
}
