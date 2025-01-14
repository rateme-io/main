import { Repository } from '@/core/repository';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export abstract class SessionAbstractRepository extends Repository<SessionEntity> {
  abstract create(session: SessionEntity): Promise<SessionEntity>;

  abstract update(session: SessionEntity): Promise<SessionEntity>;

  abstract remove(id: string): Promise<void>;

  abstract findById(id: string): Promise<SessionEntity | null>;

  abstract findAllByUserId(userId: string): Promise<SessionEntity[]>;
}
