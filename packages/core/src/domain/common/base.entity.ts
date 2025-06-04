import { ZodError } from 'zod';

import { BaseValueObject } from '@/domain/common/base.value-object';
import { ValidationError } from '@/domain/common/validation.error';
import { validateClass } from '@/domain/common/zod-validator';

export class BaseEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  async validate() {
    try {
      Object.getOwnPropertyNames(this).forEach((property) => {
        try {
          const field = Reflect.get(this, property);

          if (field instanceof BaseValueObject) {
            field.validate();
          }
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach((subError) => {
              subError.path.unshift(property);
            });

            throw error;
          }
        }
      });

      return validateClass(this);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.errors);
      }
    }
  }

  static create(_entity: CreateEntityCommand<BaseEntity>): BaseEntity {
    throw new Error('Method not implemented.');
  }
}

export type CreateEntityCommand<Entity extends BaseEntity> = Omit<
  Entity,
  'id' | 'createdAt' | 'updatedAt' | 'validate'
> &
  Partial<Pick<Entity, 'createdAt' | 'id' | 'updatedAt'>>;

export const addBaseFields = <Entity extends BaseEntity>(
  entity: Entity,
  command: CreateEntityCommand<Entity>,
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
