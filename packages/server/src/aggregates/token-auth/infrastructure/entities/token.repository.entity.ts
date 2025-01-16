import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { SessionRepositoryEntity } from '@/entities/session/infrastructure';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, name: 'access_token', unique: true })
  accessToken: string;

  @Column({ type: 'varchar', length: 320, name: 'refresh_token', unique: true })
  refreshToken: string;

  @Column({ type: 'timestamp', name: 'access_token_expires_at' })
  accessTokenExpiresAt: Date;

  @Column({ type: 'timestamp', name: 'refresh_token_expires_at' })
  refreshTokenExpiresAt: Date;

  @OneToOne(() => SessionRepositoryEntity, (session) => session.id)
  @JoinColumn({ name: 'session_id' })
  session: SessionRepositoryEntity;

  static create(command: CreateRepoEntityCommand<TokenRepositoryEntity>) {
    const token = new TokenRepositoryEntity();

    token.accessToken = command.accessToken;
    token.refreshToken = command.refreshToken;
    token.accessTokenExpiresAt = command.accessTokenExpiresAt;
    token.refreshTokenExpiresAt = command.refreshTokenExpiresAt;
    token.session = command.session;

    addBaseFields(token, command);

    return token;
  }
}
