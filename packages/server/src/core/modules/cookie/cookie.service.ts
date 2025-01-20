import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { ConfigService } from '@/core/modules/config';

const ACCESS_TOKEN_COOKIE_NAME = 'access-token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';
const SESSION_COOKIE_NAME = 'session';

@Injectable()
export class CookieService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  getAccessToken(request: Request) {
    const accessToken = request.cookies[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken || typeof accessToken !== 'string') {
      return null;
    }

    return accessToken;
  }

  setAccessToken(response: Response, token: string) {
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: !this.configService.isDevelopment,
    });
  }

  clearAccessToken(response: Response) {
    response.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  }

  getRefreshToken(request: Request) {
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken || typeof refreshToken !== 'string') {
      return null;
    }

    return refreshToken;
  }

  setRefreshToken(response: Response, token: string) {
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: !this.configService.isDevelopment,
    });
  }

  clearRefreshToken(response: Response) {
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
  }

  getSessionId(request: Request) {
    const sessionId = request.cookies[SESSION_COOKIE_NAME];

    if (!sessionId || typeof sessionId !== 'string') {
      return null;
    }

    return sessionId;
  }

  setSessionId(response: Response, sessionId: string) {
    response.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: !this.configService.isDevelopment,
    });
  }

  clearSessionId(response: Response) {
    response.clearCookie(SESSION_COOKIE_NAME);
  }
}
