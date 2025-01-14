import { Inject, Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '@/entities/user/domain';
import { PasswordEntity } from '@rateme/core/domain/entities/password.entity';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordRepositoryEntity } from '../entities';
import { PasswordAbstractRepository } from '@/entities/token-auth/domain';
import { UserRepository } from '@/entities/user/infrastructure';

@Injectable()
export class PasswordRepository extends PasswordAbstractRepository {
  constructor(
    @Inject(UserAbstractRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(PasswordRepositoryEntity)
    private readonly passwordEntity: Repository<PasswordRepositoryEntity>,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<PasswordEntity | null> {
    const password = await this.passwordEntity.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!password) {
      return null;
    }

    return this.toDomain(password);
  }

  async findById(id: string): Promise<PasswordEntity | null> {
    const password = await this.passwordEntity.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!password) {
      return null;
    }

    return this.toDomain(password);
  }

  async create(password: PasswordEntity): Promise<PasswordEntity> {
    const createdPassword = await this.passwordEntity.save(
      this.toPersistence(password),
    );

    return this.toDomain(createdPassword);
  }

  async remove(password: PasswordEntity): Promise<void> {
    await this.passwordEntity.remove(this.toPersistence(password));
  }

  async update(password: PasswordEntity): Promise<PasswordEntity> {
    const updatedPassword = await this.passwordEntity.save(
      this.toPersistence(password),
    );

    return this.toDomain(updatedPassword);
  }

  toDomain(entity: PasswordRepositoryEntity): PasswordEntity {
    return PasswordEntity.create({
      user: this.userRepository.toDomain(entity.user),
      hash: new PasswordVo(entity.hash),
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toPersistence(entity: PasswordEntity): PasswordRepositoryEntity {
    return PasswordRepositoryEntity.create({
      user: this.userRepository.toPersistence(entity.user),
      hash: entity.hash.getValue(),
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
