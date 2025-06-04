import { PasswordEntity } from '@rateme/core/domain/entities/password.entity';

import { Repository } from '@/core/repository';

export abstract class PasswordAbstractRepository extends Repository<PasswordEntity> {
  abstract create(password: PasswordEntity): Promise<PasswordEntity>;

  abstract remove(password: PasswordEntity): Promise<void>;

  abstract update(password: PasswordEntity): Promise<PasswordEntity>;

  abstract findById(id: string): Promise<PasswordEntity | null>;

  abstract findByUserId(userId: string): Promise<PasswordEntity | null>;
}
