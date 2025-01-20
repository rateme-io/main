import { EntityManager, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

import { Repository as BaseRepository } from '@/core/repository/repository';

export abstract class TypeormRepository<
  Entity,
  RepoEntity extends ObjectLiteral,
> extends BaseRepository<Entity> {
  protected readonly repository: Repository<RepoEntity>;

  protected constructor(
    entityManager: EntityManager,
    entity: EntityTarget<RepoEntity>,
  ) {
    super();

    this.repository = entityManager.getRepository(entity);
  }
}
