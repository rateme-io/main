import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';

@Entity({ name: 'collection-items' })
export class CollectionItemRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user?: UserRepositoryEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'collection_id' })
  collection?: CollectionRepositoryEntity;

  @Column({ name: 'collection_id', type: 'uuid' })
  collectionId: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'json_schema', type: 'jsonb' })
  jsonFields: object;

  static create(
    command: CreateRepoEntityCommand<CollectionItemRepositoryEntity>,
  ) {
    const entity = new CollectionItemRepositoryEntity();

    entity.user = command.user;
    entity.userId = command.userId;
    entity.collection = command.collection;
    entity.collectionId = command.collectionId;
    entity.name = command.name;
    entity.jsonFields = command.jsonFields;

    addBaseFields(entity, command);

    return entity;
  }
}
