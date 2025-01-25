import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { SessionStatus } from '@rateme/core/domain/entities/session.entity';

import { TokenAuthAbstractService } from '@/aggregates/token-auth/domain';
import { CookieService } from '@/core/modules/cookie';
import { SessionAbstractRepository } from '@/entities/session/domain';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SessionAbstractRepository)
    private readonly sessionRepository: SessionAbstractRepository,
    @Inject(forwardRef(() => TokenAuthAbstractService))
    private readonly tokenAuthService: TokenAuthAbstractService,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {}

  async getSession(request: Request) {
    const sessionId = this.cookieService.getSessionId(request);

    if (!sessionId) {
      throw new UnauthorizedException();
    }

    const session = await this.sessionRepository.findById(sessionId);

    if (!session || session.status === SessionStatus.inactive) {
      throw new UnauthorizedException();
    }

    return session;
  }

  async checkSession(command: CheckSessionCommand): Promise<boolean> {
    const session = await this.getSession(command.request);

    const accessToken = this.cookieService.getAccessToken(command.request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    await this.tokenAuthService.checkSession({
      sessionId: session.id,
      accessToken,
    });

    return true;
  }
}

export interface CheckSessionCommand {
  request: Request;
}
