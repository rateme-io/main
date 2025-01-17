import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';

@Entity({ name: 'rating-system-forks' })
export class RatingSystemForkRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'original_rating_system_id' })
  original: RatingSystemRepositoryEntity;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'forked_rating_system_id' })
  forked: RatingSystemRepositoryEntity;

  static create(
    command: CreateRepoEntityCommand<RatingSystemForkRepositoryEntity>,
  ) {
    const entity = new RatingSystemForkRepositoryEntity();

    entity.user = command.user;
    entity.original = command.original;
    entity.forked = command.forked;

    addBaseFields(entity, command);

    return entity;
  }
}
