import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { SessionDtoService } from '@rateme/core/domain/dtos/entities/session.dto';
import { UserDtoService } from '@rateme/core/domain/dtos/entities/user.dto';
import { SessionResponseDto } from '@rateme/core/domain/dtos/session/session-response.dto';

import { AuthGuard } from '@/core/modules/auth';

import { SessionAbstractService } from '../domain';
import { CookieService } from '@/core/modules/cookie';

@Controller('/session')
export class SessionController {
  constructor(
    @Inject(SessionAbstractService)
    private readonly sessionService: SessionAbstractService,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@Req() request: Request): Promise<SessionResponseDto> {
    const sessionId = this.cookieService.getSessionId(request);
    const session = await this.sessionService.getSession(sessionId!);

    return {
      user: UserDtoService.mapToDto(session.user),
      session: SessionDtoService.mapToDto(session),
    };
  }
}
