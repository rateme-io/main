import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'passwords' })
export class PasswordRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true, name: 'hash' })
  hash: string;

  @OneToOne(() => UserRepositoryEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  static create(command: CreateRepoEntityCommand<PasswordRepositoryEntity>) {
    const entity = new PasswordRepositoryEntity();

    entity.hash = command.hash;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;
  }
}
