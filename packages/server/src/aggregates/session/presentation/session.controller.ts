import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { SessionDtoService } from '@rateme/core/domain/dtos/entities/session.dto';
import { UserDtoService } from '@rateme/core/domain/dtos/entities/user.dto';
import { SessionResponseDto } from '@rateme/core/domain/dtos/session/session-response.dto';

import { AuthGuard } from '@/core/modules/auth';

import { SessionAbstractService } from '../domain';

@Controller('/session')
export class SessionController {
  constructor(
    @Inject(SessionAbstractService)
    private readonly sessionService: SessionAbstractService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@Req() request: Request): Promise<SessionResponseDto> {
    const session = await this.sessionService.getSession(request);

    return {
      user: UserDtoService.mapToDto(session.user),
      session: SessionDtoService.mapToDto(session),
    };
  }
}
