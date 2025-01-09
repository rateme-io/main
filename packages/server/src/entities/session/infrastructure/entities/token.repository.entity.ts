import { BaseEntity } from '@/core/repository';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, name: 'access_token', unique: true })
  accessToken: string;

  @Column({ type: 'varchar', length: 320, name: 'refresh_token', unique: true })
  refreshToken: string;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;
}
