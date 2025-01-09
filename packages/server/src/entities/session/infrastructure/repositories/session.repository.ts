import {
  SessionAbstractRepository,
  TokenAbstractRepository,
} from '@/entities/session/domain';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from '@/entities/user/infrastructure';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';
import {
  SessionRepositoryEntity,
  TokenRepository,
} from '@/entities/session/infrastructure';

@Injectable()
export class SessionRepository extends SessionAbstractRepository {
  constructor(
    @InjectRepository(SessionRepositoryEntity)
    private readonly sessionEntity: Repository<SessionRepositoryEntity>,
    @Inject(UserAbstractRepository)
    private readonly userRepository: UserRepository,
    @Inject(TokenAbstractRepository)
    private readonly tokenRepository: TokenRepository,
  ) {
    super();
  }

  async create(session: SessionEntity): Promise<SessionEntity> {
    const newSession = await this.sessionEntity.save(
      this.toPersistence(session),
    );

    return this.toDomain(newSession);
  }

  async remove(id: string): Promise<void> {
    await this.sessionEntity.delete(id);
  }

  async findAllByUserId(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.sessionEntity.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return sessions.map((session) => this.toDomain(session));
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const session = await this.sessionEntity.findOneBy({ id });

    if (!session) {
      return null;
    }

    return this.toDomain(session);
  }

  toDomain(entity: SessionRepositoryEntity): SessionEntity {
    const session = new SessionEntity();

    session.id = entity.id;
    session.sessionId = entity.sessionId;
    session.createdAt = entity.createdAt;
    session.updatedAt = entity.updatedAt;
    session.userAgent = entity.userAgent;
    session.ipAddress = entity.ipAddress;
    session.user = this.userRepository.toDomain(entity.user);
    session.token = this.tokenRepository.toDomain(entity.token);

    return session;
  }

  toPersistence(entity: SessionEntity): SessionRepositoryEntity {
    const session = new SessionRepositoryEntity();

    session.id = entity.id;
    session.sessionId = entity.sessionId;
    session.createdAt = entity.createdAt;
    session.updatedAt = entity.updatedAt;
    session.userAgent = entity.userAgent;
    session.ipAddress = entity.ipAddress;
    session.user = this.userRepository.toPersistence(entity.user);
    session.token = this.tokenRepository.toPersistence(entity.token);

    return session;
  }
}
