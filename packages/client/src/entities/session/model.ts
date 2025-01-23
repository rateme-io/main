import { atom, reatomAsync } from '@reatom/framework';

import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import {
  SessionEntity,
  SessionStatus,
} from '@rateme/core/domain/entities/session.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { LogoUrlVo } from '@rateme/core/domain/value-objects/logo-url.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';

import { tokenAuthApi } from './api.ts';

export const $safeSession = atom<SessionEntity | null>(null, '$safeSession');

export const $session = atom((ctx) => {
  const unsafeSession = ctx.get($safeSession);

  if (!unsafeSession) {
    throw new Error('Session is not initialized');
  }

  return unsafeSession;
}, '$session');

export const login = reatomAsync(async (ctx, command: LoginCommand) => {
  switch (command.type) {
    case 'token': {
      const result = await ctx.schedule(
        async () =>
          await ctx.schedule(() => tokenAuthApi.login(ctx, command.dto)),
      );

      if (result.data) {
        $safeSession(
          ctx,
          SessionEntity.create({
            ...result.data.session,
            ipAddress: 'ip-address',
            userAgent: 'user-agent',
            status: SessionStatus.active,
            user: UserEntity.create({
              ...result.data.user,
              email: new EmailVo(result.data.user.email),
              name: new NameVo(result.data.user.name),
              username: new UsernameVo(result.data.user.username),
              logoUrl: new LogoUrlVo(result.data.user.logoUrl),
            }),
          }),
        );
      }

      return result;
    }
  }
}, 'login');

export type LoginCommand = {
  type: 'token';
  dto: TokenLoginDto;
};
