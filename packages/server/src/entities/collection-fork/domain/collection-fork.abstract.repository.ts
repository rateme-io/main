import { CollectionForkEntity } from '@rateme/core/domain/entities/collection-fork.entity';

import { Repository } from '@/core/repository';

export abstract class CollectionForkAbstractRepository extends Repository<CollectionForkEntity> {}
