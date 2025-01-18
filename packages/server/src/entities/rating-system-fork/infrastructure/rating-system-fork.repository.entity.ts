import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';

@Entity({ name: 'rating-system-forks' })
export class RatingSystemForkRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'original_rating_system_id' })
  original: Promise<RatingSystemRepositoryEntity>;

  @Column({ name: 'original_rating_system_id', type: 'uuid' })
  originalId: string;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'forked_rating_system_id' })
  forked: Promise<RatingSystemRepositoryEntity>;

  @Column({ name: 'forked_rating_system_id', type: 'uuid' })
  forkedId: string;

  static create(
    command: CreateRepoEntityCommand<RatingSystemForkRepositoryEntity>,
  ) {
    const entity = new RatingSystemForkRepositoryEntity();

    entity.userId = command.userId;
    entity.originalId = command.originalId;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}
