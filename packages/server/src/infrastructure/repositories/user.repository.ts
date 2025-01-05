import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRepository } from '@/domain/users';
import { UserEntity } from '@rateme-io/shared';

@Entity({ name: 'users' })
export class UserRepositoryImpl extends UserRepository<UserRepositoryImpl> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  password: string;

  toDomain(entity: UserRepositoryImpl): UserEntity {
    return new UserEntity({
      name: entity.name,
      password: entity.password,
      username: entity.username,
      email: entity.email,
      id: entity.id,
    });
  }
}