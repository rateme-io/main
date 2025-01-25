import { action, atom, reatomAsync } from '@reatom/framework';

import { SessionResponseDto } from '@rateme/core/domain/dtos/session/session-response.dto';
import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import { TokenRegisterDto } from '@rateme/core/domain/dtos/token-auth/token-register.dto.js';
import {
  SessionEntity,
  SessionStatus,
} from '@rateme/core/domain/entities/session.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { LogoUrlVo } from '@rateme/core/domain/value-objects/logo-url.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';

import { sessionApi, tokenAuthApi } from './api.ts';

export const $safeSession = atom<SessionEntity | null>(null, '$safeSession');

export const $session = atom((ctx) => {
  const unsafeSession = ctx.get($safeSession);

  if (!unsafeSession) {
    throw new Error('Session is not initialized');
  }

  return unsafeSession;
}, '$session');

export const loginAction = reatomAsync(async (ctx, command: LoginCommand) => {
  switch (command.type) {
    case 'token': {
      const result = await ctx.schedule(() =>
        tokenAuthApi.login(ctx, command.dto),
      );

      if (result.data) {
        $safeSession(ctx, mapDtoToDomain(result.data));
      }

      return result;
    }
  }
}, 'loginAction');

export type LoginCommand = {
  type: 'token';
  dto: TokenLoginDto;
};

export const registerAction = reatomAsync(
  async (ctx, command: RegisterCommand) => {
    switch (command.type) {
      case 'token': {
        const result = await ctx.schedule(() =>
          tokenAuthApi.register(ctx, command.dto),
        );

        if (result.data) {
          $safeSession(ctx, mapDtoToDomain(result.data));
        }

        return result;
      }
    }
  },
  'registerAction',
);

export type RegisterCommand = {
  type: 'token';
  dto: TokenRegisterDto;
};

export const loadMeAction = reatomAsync(async (ctx) => {
  const result = await ctx.schedule((ctx) => sessionApi.me(ctx));

  if (result.data) {
    const session = mapDtoToDomain(result.data);

    $safeSession(ctx, session);

    return session;
  }

  const tokenRefreshResult = await ctx.schedule((ctx) =>
    tokenAuthApi.refresh(ctx),
  );

  if (tokenRefreshResult.data) {
    const session = mapDtoToDomain(tokenRefreshResult.data);

    $safeSession(ctx, session);

    return session;
  }

  return null;
}, 'loadMeAction');

export const logoutAction = action(async (ctx) => {
  document.cookie = '';

  await ctx.schedule((ctx) => tokenAuthApi.logout(ctx));

  await ctx.schedule((ctx) => {
    $safeSession(ctx, null);
  });
}, 'logoutAction');

export const mapDtoToDomain = (dto: SessionResponseDto) => {
  return SessionEntity.create({
    ...dto.session,
    ipAddress: 'ip-address',
    userAgent: 'user-agent',
    status: SessionStatus.active,
    user: UserEntity.create({
      ...dto.user,
      email: new EmailVo(dto.user.email),
      name: new NameVo(dto.user.name),
      username: new UsernameVo(dto.user.username),
      logoUrl: new LogoUrlVo(dto.user.logoUrl),
    }),
  });
};
