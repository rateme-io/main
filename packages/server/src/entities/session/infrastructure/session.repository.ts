import { SessionAbstractRepository } from '@/entities/session/domain';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';
import { SessionRepositoryEntity } from './session.repository.entity';
import { TypeormRepository } from '@/core/repository/typeorm.repository';

export class SessionRepository
  extends TypeormRepository<SessionEntity, SessionRepositoryEntity>
  implements SessionAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, SessionRepositoryEntity);
  }

  async create(session: SessionEntity): Promise<SessionEntity> {
    const newSession = await this.repository.save(this.toPersistence(session));

    return this.toDomain(newSession);
  }

  async update(session: SessionEntity): Promise<SessionEntity> {
    await this.repository.update(session.id, this.toPersistence(session));

    const newSession = await this.repository.findOne({
      where: { id: session.id },
      relations: ['user'],
    });

    return this.toDomain(newSession!);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllByUserId(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    return sessions.map((session) => this.toDomain(session));
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const session = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!session) {
      return null;
    }

    return this.toDomain(session);
  }

  toDomain(entity: SessionRepositoryEntity): SessionEntity {
    return SessionEntity.create({
      userAgent: entity.userAgent,
      ipAddress: entity.ipAddress,
      status: entity.status,
      sessionId: entity.sessionId,
      user: this.userRepository.toDomain(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: SessionEntity): SessionRepositoryEntity {
    return SessionRepositoryEntity.create({
      userAgent: entity.userAgent,
      ipAddress: entity.ipAddress,
      status: entity.status,
      sessionId: entity.sessionId,
      user: this.userRepository.toPersistence(entity.user),
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
