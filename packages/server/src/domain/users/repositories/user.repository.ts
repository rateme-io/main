import { Repository } from '@/domain/interfaces/repository.interface';
import { UserEntity } from '@rateme/domain';

export abstract class UserRepository<RepositoryEntity> implements Repository<UserEntity, RepositoryEntity> {
  abstract toDomain(entity: RepositoryEntity): UserEntity;
}