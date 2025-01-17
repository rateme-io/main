import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'rating-systems' })
export class RatingSystemRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @Column({ name: 'version', type: 'integer' })
  version: number;

  @Column({ name: 'json_schema', type: 'jsonb' })
  jsonSchema: object;

  @Column({ name: 'json_formula', type: 'jsonb' })
  jsonFormula: object;

  static create(
    command: CreateRepoEntityCommand<RatingSystemRepositoryEntity>,
  ) {
    const entity = new RatingSystemRepositoryEntity();

    entity.jsonFormula = command.jsonFormula;
    entity.jsonSchema = command.jsonSchema;
    entity.version = command.version;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;
  }
}
