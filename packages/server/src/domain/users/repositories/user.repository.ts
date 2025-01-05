import { Repository } from '@/domain/interfaces/repository.interface';
import { UserEntity } from '@rateme-io/shared';

export abstract class UserRepository<RepositoryEntity> implements Repository<UserEntity, RepositoryEntity> {
  abstract toDomain(entity: RepositoryEntity): UserEntity;
}