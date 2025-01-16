import { EntityManager } from 'typeorm';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';
import { LogoUrlVo } from '@rateme/core/domain/value-objects/logo-url.vo';
import { UserRepositoryEntity } from './user.repository.entity';
import { TypeormRepository } from '@/core/repository/typeorm.repository';

export class UserRepository
  extends TypeormRepository<UserEntity, UserRepositoryEntity>
  implements UserAbstractRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, UserRepositoryEntity);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const entity = this.toPersistence(user);

    const newUser = await this.repository.save(entity);

    return this.toDomain(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  toDomain(entity: UserRepositoryEntity): UserEntity {
    return UserEntity.create({
      email: new EmailVo(entity.email),
      name: new NameVo(entity.name),
      verifiedStatus: entity.verifiedStatus,
      username: new UsernameVo(entity.username),
      logoUrl: new LogoUrlVo(entity.logoUrl),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: UserEntity): UserRepositoryEntity {
    return UserRepositoryEntity.create({
      email: entity.email.getValue(),
      name: entity.name.getValue(),
      verifiedStatus: entity.verifiedStatus,
      username: entity.username.getValue(),
      logoUrl: entity.logoUrl.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
