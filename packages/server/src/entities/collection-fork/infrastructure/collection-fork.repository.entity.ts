import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';

@Entity({ name: 'collection_forks' })
export class CollectionForkRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user?: UserRepositoryEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'original_collection_id' })
  original?: CollectionRepositoryEntity;

  @Column({ name: 'original_collection_id', type: 'uuid' })
  originalId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'forked_collection_id' })
  forked?: CollectionRepositoryEntity;

  @Column({ name: 'forked_collection_id', type: 'uuid' })
  forkedId: string;

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
