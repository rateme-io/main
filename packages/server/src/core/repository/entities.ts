import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

export type CreateRepoEntityCommand<Entity extends BaseEntity> = Omit<
  Entity,
  'id' | 'createdAt' | 'updatedAt'
> &
  Partial<Pick<Entity, 'createdAt' | 'id' | 'updatedAt'>>;

export const addBaseFields = <Entity extends BaseEntity>(
  entity: Entity,
  command: CreateRepoEntityCommand<Entity>,
) => {
  if (command.id) {
    entity.id = command.id;
  }

  if (command.createdAt) {
    entity.createdAt = command.createdAt;
  }

  if (command.updatedAt) {
    entity.updatedAt = command.updatedAt;
  }
};
