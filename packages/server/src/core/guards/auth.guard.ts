import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  TokenAuthAbstractService,
  TokenAuthAbstractUnitOfWork,
} from '@/entities/token-auth/domain';
import { TokenAuthUnitOfWork } from '@/entities/token-auth/infrastructure/token-auth.unit-of-wok';
import { SessionStatus } from '@rateme/core/domain/entities/session.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenAuthAbstractUnitOfWork)
    private readonly tokenAuthUnitOfWork: TokenAuthUnitOfWork,
    @Inject(TokenAuthAbstractService)
    private readonly tokenAuthService: TokenAuthAbstractService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.tokenAuthUnitOfWork.start(async ({ sessionRepository }) => {
      const request = context.switchToHttp().getRequest();

      const sessionId = request.headers['session'];

      if (!sessionId || typeof sessionId !== 'string') {
        throw new UnauthorizedException();
      }

      const session = await sessionRepository.findById(sessionId);

      if (!session || session.status === SessionStatus.inactive) {
        throw new UnauthorizedException();
      }

      const token = request.headers['authorization'];

      if (!token || typeof token !== 'string') {
        throw new UnauthorizedException();
      }

      const isValid = await this.tokenAuthService.checkSession({
        sessionId,
        accessToken: token,
      });

      if (!isValid) {
        throw new UnauthorizedException();
      }

      return true;
    });
  }
}
