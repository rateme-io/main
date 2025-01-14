import { Column, Entity } from 'typeorm';
import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';

@Entity({ name: 'users' })
export class UserRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, unique: true, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'username' })
  username: string;

  @Column({ type: 'varchar', length: 50, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'logo_url' })
  logoUrl: string | null;

  static create(command: CreateRepoEntityCommand<UserRepositoryEntity>) {
    const user = new UserRepositoryEntity();

    user.email = command.email;
    user.username = command.username;
    user.name = command.name;
    user.isVerified = command.isVerified;
    user.logoUrl = command.logoUrl;

    addBaseFields(user, command);

    return user;
  }
}
