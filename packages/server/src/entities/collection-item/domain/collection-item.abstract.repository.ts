import { Repository } from '@/core/repository';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';

export abstract class CollectionItemAbstractRepository extends Repository<CollectionItemEntity> {}
