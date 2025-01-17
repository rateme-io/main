import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';

@Entity({ name: 'rating-system-hierarchy' })
export class RatingSystemHierarchyRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'parent_rating_system_id' })
  parent: RatingSystemRepositoryEntity;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'child_rating_system_id' })
  child: RatingSystemRepositoryEntity;

  static create(
    command: CreateRepoEntityCommand<RatingSystemHierarchyRepositoryEntity>,
  ) {
    const entity = new RatingSystemHierarchyRepositoryEntity();

    entity.user = command.user;
    entity.parent = command.parent;
    entity.child = command.child;

    addBaseFields(entity, command);

    return entity;
  }
}
