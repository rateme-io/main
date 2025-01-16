import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';

@Entity({ name: 'collection_forks' })
export class CollectionForkRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'original_collection_id' })
  original: CollectionRepositoryEntity;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'forked_collection_id' })
  forked: CollectionRepositoryEntity;

  static create(
    command: CreateRepoEntityCommand<CollectionForkRepositoryEntity>,
  ) {
    const entity = new CollectionForkRepositoryEntity();

    entity.user = command.user;
    entity.original = command.original;
    entity.forked = command.forked;

    addBaseFields(entity, command);

    return entity;
  }
}
