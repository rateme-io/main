import { reatomAsync, withAbort } from '@reatom/framework';

import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';

import { ratemeApi } from '@/shared/api';

export const tokenAuthApi = {
  login: reatomAsync(async (ctx, data: TokenLoginDto) => {
    return ratemeApi.auth.token.login(data, { signal: ctx.controller.signal });
  }, 'tokenAuthApi.login').pipe(withAbort()),

  refresh: reatomAsync(async (ctx) => {
    return ratemeApi.auth.token.refresh({ signal: ctx.controller.signal });
  }, 'tokenAuthApi.refresh').pipe(withAbort()),

  logout: reatomAsync(async (ctx) => {
    return ratemeApi.auth.token.logout({ signal: ctx.controller.signal });
  }, 'tokenAuthApi.logout').pipe(withAbort()),
};

export const sessionApi = {
  me: reatomAsync(async (ctx) => {
    return ratemeApi.session.me({ signal: ctx.controller.signal });
  }, 'sessionApi.me').pipe(withAbort()),
};
