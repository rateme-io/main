import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  addBaseFields,
  BaseEntity,
  CreateRepoEntityCommand,
} from '@/core/repository';
import { UserRepositoryEntity } from '@/entities/user/infrastructure';
import { SessionStatus } from '@rateme/core/domain/entities/session.entity';

@Entity({ name: 'sessions' })
export class SessionRepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 320, name: 'session_id', unique: true })
  sessionId: string;

  @ManyToOne(() => UserRepositoryEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserRepositoryEntity;

  @Column({
    type: 'enum',
    name: 'status',
    enum: SessionStatus,
    default: SessionStatus.active,
  })
  status: SessionStatus;

  @Column({ type: 'varchar', name: 'ip_address' })
  ipAddress: string;

  @Column({ type: 'varchar', length: 255, name: 'user_agent', nullable: true })
  userAgent: string | null;

  static create(command: CreateRepoEntityCommand<SessionRepositoryEntity>) {
    const session = new SessionRepositoryEntity();

    session.sessionId = command.sessionId;
    session.user = command.user;
    session.status = command.status;
    session.ipAddress = command.ipAddress;
    session.userAgent = command.userAgent;

    addBaseFields(session, command);

    return session;
  }
}
