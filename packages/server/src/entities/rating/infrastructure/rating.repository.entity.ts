import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { JsonInterface } from '@rateme/core/domain/common/json.interface';

import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { CollectionRepositoryEntity } from '@/entities/collection/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'ratings' })
export class RatingRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => CollectionRepositoryEntity, (collection) => collection.id)
  @JoinColumn({ name: 'collection_id' })
  collection: Promise<CollectionRepositoryEntity>;

  @Column({ name: 'collection_id', type: 'uuid' })
  collectionId: string;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'rating_system_id' })
  ratingSystem: Promise<RatingSystemRepositoryEntity>;

  @Column({ name: 'rating_system_id', type: 'uuid' })
  ratingSystemId: string;

  @Column({ name: 'json_rates', type: 'jsonb' })
  jsonRates: JsonInterface;

  static create(command: CreateRepoEntityCommand<RatingRepositoryEntity>) {
    const entity = new RatingRepositoryEntity();

    entity.jsonRates = command.jsonRates;
    entity.userId = command.userId;
    entity.collectionId = command.collectionId;
    entity.ratingSystemId = command.ratingSystemId;

    addBaseFields(entity, command);

    return entity;
  }
}
