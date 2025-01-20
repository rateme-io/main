import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'collection_forks' })
export class CollectionForkRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'original_collection_id' })
  original: Promise<CollectionRepositoryEntity>;

  @Column({ name: 'original_collection_id', type: 'uuid' })
  originalId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'forked_collection_id' })
  forked: Promise<CollectionRepositoryEntity>;

  @Column({ name: 'forked_collection_id', type: 'uuid' })
  forkedId: string;

  static create(
    command: CreateRepoEntityCommand<CollectionForkRepositoryEntity>,
  ) {
    const entity = new CollectionForkRepositoryEntity();

    entity.userId = command.userId;
    entity.originalId = command.originalId;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}
