import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { PasswordAuthAbstractService } from '@/aggregates/password-auth/domain';
import { SessionAbstractService } from '@/aggregates/session/domain';
import { CookieService } from '@/core/modules/cookie';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SessionAbstractService)
    private readonly sessionService: SessionAbstractService,
    @Inject(forwardRef(() => PasswordAuthAbstractService))
    private readonly passwordAuthService: PasswordAuthAbstractService,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {}

  async getSession(request: Request) {
    const sessionId = this.cookieService.getSessionId(request);
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    return this.sessionService.getSession(sessionId);
  }

  async checkSession(command: CheckSessionCommand): Promise<boolean> {
    const session = await this.getSession(command.request);

    const accessToken = this.cookieService.getAccessToken(command.request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    await this.passwordAuthService.checkSession({
      sessionId: session.id,
      accessToken,
    });

    return true;
  }
}

export interface CheckSessionCommand {
  request: Request;
}
