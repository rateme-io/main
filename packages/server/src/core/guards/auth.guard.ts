import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenAuthAbstractService } from '@/entities/token-auth/domain';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SessionAbstractRepository)
    private readonly sessionRepository: SessionRepository,
    @Inject(TokenAuthAbstractService)
    private readonly tokenAuthService: TokenAuthAbstractService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sessionId = request.headers['session'];

    if (!sessionId || typeof sessionId !== 'string') {
      throw new UnauthorizedException();
    }

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    const token = request.headers['authorization'];

    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException();
    }

    const isValid = await this.tokenAuthService.checkSession({
      accessToken: token,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
