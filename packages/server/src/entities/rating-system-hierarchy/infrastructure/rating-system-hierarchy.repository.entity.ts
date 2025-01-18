import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { RatingSystemRepositoryEntity } from '@/entities/rating-system/infrastructure';

@Entity({ name: 'rating-system-hierarchy' })
export class RatingSystemHierarchyRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'parent_rating_system_id' })
  parent: Promise<RatingSystemRepositoryEntity>;

  @Column({ name: 'parent_rating_system_id', type: 'uuid' })
  parentId: string;

  @ManyToOne(
    () => RatingSystemRepositoryEntity,
    (ratingSystem) => ratingSystem.id,
  )
  @JoinColumn({ name: 'child_rating_system_id' })
  child: Promise<RatingSystemRepositoryEntity>;

  @Column({ name: 'child_rating_system_id', type: 'uuid' })
  childId: string;

  static create(
    command: CreateRepoEntityCommand<RatingSystemHierarchyRepositoryEntity>,
  ) {
    const entity = new RatingSystemHierarchyRepositoryEntity();

    entity.userId = command.userId;
    entity.parentId = command.parentId;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}
