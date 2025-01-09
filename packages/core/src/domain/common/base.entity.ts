import { validateOrReject } from 'class-validator';

export class BaseEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  validate() {
    return validateOrReject(this, {
      whitelist: true,
    });
  }
}