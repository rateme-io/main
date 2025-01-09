import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import { Repository } from '@/core/repository';

export abstract class UserAbstractRepository extends Repository<UserEntity> {
  abstract create(user: UserEntity, password: string): Promise<UserEntity>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;

  abstract findById(id: string): Promise<UserEntity | null>;

  abstract findPasswordHash(email: string): Promise<string | null>;
}
