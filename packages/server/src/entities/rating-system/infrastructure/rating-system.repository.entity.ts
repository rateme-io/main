import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { JsonInterface } from '@rateme/core/domain/common/json.interface';

import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'rating-systems' })
export class RatingSystemRepositoryEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'version', type: 'integer' })
  version: number;

  @Column({ name: 'json_schema', type: 'jsonb' })
  jsonSchema: JsonInterface;

  @Column({ name: 'json_formula', type: 'jsonb' })
  jsonFormula: JsonInterface;

  static create(
    command: CreateRepoEntityCommand<RatingSystemRepositoryEntity>,
  ) {
    const entity = new RatingSystemRepositoryEntity();

    entity.name = command.name;
    entity.jsonFormula = command.jsonFormula;
    entity.jsonSchema = command.jsonSchema;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}
