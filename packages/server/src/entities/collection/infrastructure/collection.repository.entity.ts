import { JsonInterface } from '@rateme/core/domain/common/json.interface';
import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'collections' })
export class CollectionRepositoryEntity extends BaseEntity {
  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserRepositoryEntity>;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'json_schema', type: 'jsonb' })
  jsonSchema: JsonInterface;

  @Column({ name: 'version', type: 'integer' })
  version: number;

  static create(command: CreateRepoEntityCommand<CollectionRepositoryEntity>) {
    const entity = new CollectionRepositoryEntity();

    entity.jsonSchema = command.jsonSchema;
    entity.name = command.name;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}
