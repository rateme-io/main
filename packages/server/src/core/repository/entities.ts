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

  static create(entity: CreateRepoEntityCommand<BaseEntity>): BaseEntity {
    throw new Error(
      `Method not implemented.\n${JSON.stringify(entity, null, 2)}`,
    );
  }
}

export type CreateRepoEntityCommand<Entity extends BaseEntity> = Omit<
  Entity,
  'id' | 'createdAt' | 'updatedAt' | PromiseFields<Entity>
> &
  Partial<Pick<Entity, 'createdAt' | 'id' | 'updatedAt'>>;

type PromiseFields<T> = {
  [K in keyof T]: T[K] extends Promise<unknown> ? K : never;
}[keyof T];

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
