import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';

@Entity({ name: 'collection_hierarchy' })
export class CollectionHierarchyRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'parent_collection_id' })
  parent: CollectionRepositoryEntity;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'child_collection_id' })
  child: CollectionRepositoryEntity;

  static create(
    command: CreateRepoEntityCommand<CollectionHierarchyRepositoryEntity>,
  ) {
    const entity = new CollectionHierarchyRepositoryEntity();

    entity.user = command.user;
    entity.parent = command.parent;
    entity.child = command.child;

    addBaseFields(entity, command);

    return entity;
  }
}
