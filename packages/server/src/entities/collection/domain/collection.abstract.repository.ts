import { Repository } from '@/core/repository';
import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';

export abstract class CollectionAbstractRepository extends Repository<CollectionEntity> {}
