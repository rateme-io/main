import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/core/repository';

@Entity({ name: 'users' })
export class UserRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, unique: true, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'username' })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 50, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'logo_url' })
  logoUrl: string | null;
}
