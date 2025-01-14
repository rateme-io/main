import { UserAbstractRepository } from '@/entities/user/domain';
import {
  PasswordAbstractRepository,
  TokenAbstractRepository,
} from './repositories';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { UnitOfWork } from '@/core/unit-of-work';

export abstract class TokenAuthAbstractUnitOfWork extends UnitOfWork<TokenAuthUnitOfWorkContext> {}

export interface TokenAuthUnitOfWorkContext {
  userRepository: UserAbstractRepository;
  passwordRepository: PasswordAbstractRepository;
  sessionRepository: SessionAbstractRepository;
  tokenRepository: TokenAbstractRepository;
}
