import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';

@Entity({ name: 'ratings' })
export class RatingRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'collection_id' })
  collection: CollectionRepositoryEntity;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'rating_system_id' })
  ratingSystem: RatingSystemRepositoryEntity;

  @Column({ name: 'json_rates', type: 'jsonb' })
  jsonRates: object;

  static create(command: CreateRepoEntityCommand<RatingRepositoryEntity>) {
    const entity = new RatingRepositoryEntity();

    entity.jsonRates = command.jsonRates;
    entity.user = command.user;
    entity.collection = command.collection;
    entity.ratingSystem = command.ratingSystem;

    addBaseFields(entity, command);

    return entity;
  }
}
