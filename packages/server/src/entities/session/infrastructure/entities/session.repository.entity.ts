import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '@/core/repository';
import { TokenRepositoryEntity } from './token.repository.entity';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';

@Entity({ name: 'sessions' })
export class SessionRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, name: 'session_id', unique: true })
  sessionId: string;

  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  user: UserRepositoryEntity;

  @OneToOne(() => TokenRepositoryEntity, (token) => token.id)
  token: TokenRepositoryEntity;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', name: 'ip_address' })
  ipAddress: string;

  @Column({ type: 'varchar', length: 255, name: 'user_agent', nullable: true })
  userAgent: string | null;
}
