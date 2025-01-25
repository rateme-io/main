import { reatomAsync, withAbort } from '@reatom/framework';

import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import { TokenRegisterDto } from '@rateme/core/domain/dtos/token-auth/token-register.dto';

import { ratemeApi } from '@/shared/api';

export const tokenAuthApi = {
  login: reatomAsync(async (ctx, data: TokenLoginDto) => {
    return ratemeApi.auth.token.login(data, { signal: ctx.controller.signal });
  }, 'tokenAuthApi.login').pipe(withAbort()),

  register: reatomAsync(async (ctx, data: TokenRegisterDto) => {
    return ratemeApi.auth.token.register(data, {
      signal: ctx.controller.signal,
    });
  }, 'tokenAuthApi.register').pipe(withAbort()),

  refresh: reatomAsync(async (ctx) => {
    return ratemeApi.auth.token.refresh({ signal: ctx.controller.signal });
  }, 'tokenAuthApi.refresh').pipe(withAbort()),

  logout: reatomAsync(async (ctx) => {
    return ratemeApi.auth.token.logout({ signal: ctx.controller.signal });
  }, 'tokenAuthApi.logout'),
};

export const sessionApi = {
  me: reatomAsync(async (ctx) => {
    return ratemeApi.session.me({ signal: ctx.controller.signal });
  }, 'sessionApi.me').pipe(withAbort()),
};
