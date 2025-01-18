import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';

@Entity({ name: 'collection_hierarchy' })
export class CollectionHierarchyRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user?: UserRepositoryEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'parent_collection_id' })
  parent?: CollectionRepositoryEntity;

  @Column({ name: 'parent_collection_id', type: 'uuid' })
  parentId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'child_collection_id' })
  child?: CollectionRepositoryEntity;

  @Column({ name: 'child_collection_id', type: 'uuid' })
  childId: string;

  static create(
    command: CreateRepoEntityCommand<CollectionHierarchyRepositoryEntity>,
  ) {
    const entity = new CollectionHierarchyRepositoryEntity();

    entity.user = command.user;
    entity.userId = command.userId;
    entity.parent = command.parent;
    entity.parentId = command.parentId;
    entity.child = command.child;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}
