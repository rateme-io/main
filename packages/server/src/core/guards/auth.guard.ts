import {
  TokenAuthAbstractService,
  TokenAuthAbstractUnitOfWork,
} from '@/aggregates/token-auth/domain';
import { TokenAuthUnitOfWork } from '@/aggregates/token-auth/infrastructure';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionStatus } from '@rateme/core/domain/entities/session.entity';
import { CookieService } from '@/core/modules/cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenAuthAbstractUnitOfWork)
    private readonly tokenAuthUnitOfWork: TokenAuthUnitOfWork,
    @Inject(TokenAuthAbstractService)
    private readonly tokenAuthService: TokenAuthAbstractService,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.tokenAuthUnitOfWork.start(async ({ sessionRepository }) => {
      const request = context.switchToHttp().getRequest();

      const sessionId = this.cookieService.getSessionId(request);

      if (!sessionId) {
        throw new UnauthorizedException();
      }

      const session = await sessionRepository.findById(sessionId);

      if (!session || session.status === SessionStatus.inactive) {
        throw new UnauthorizedException();
      }

      const token = this.cookieService.getAccessToken(request);

      if (!token) {
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
