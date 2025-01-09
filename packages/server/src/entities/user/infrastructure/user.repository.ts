import { Repository } from 'typeorm';
import { UserAbstractRepository } from '@/entities/user/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryEntity } from './user.repository.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';

@Injectable()
export class UserRepository extends UserAbstractRepository {
  constructor(
    @InjectRepository(UserRepositoryEntity)
    private readonly userEntity: Repository<UserRepositoryEntity>,
  ) {
    super();
  }

  async create(user: UserEntity, password: string): Promise<UserEntity> {
    const entity = this.toPersistence(user);

    entity.password = password;

    const newUser = await this.userEntity.save(entity);

    return this.toDomain(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userEntity.findOneBy({ email });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userEntity.findOneBy({ id });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findPasswordHash(email: string): Promise<string | null> {
    const user = await this.userEntity.findOneBy({ email });

    if (!user) {
      return null;
    }

    return user.password;
  }

  toDomain(entity: UserRepositoryEntity): UserEntity {
    const user = new UserEntity();

    user.id = entity.id;
    user.email = entity.email;
    user.name = entity.name;
    user.username = entity.username;
    user.logoUrl = entity.logoUrl;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;
    user.isVerified = entity.isVerified;

    return user;
  }

  toPersistence(entity: UserEntity): UserRepositoryEntity {
    const user = new UserRepositoryEntity();

    user.id = entity.id;
    user.email = entity.email;
    user.name = entity.name;
    user.username = entity.username;
    user.logoUrl = entity.logoUrl;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;
    user.isVerified = entity.isVerified;

    return user;
  }
}
