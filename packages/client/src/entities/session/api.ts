import { reatomAsync, withAbort } from '@reatom/framework';

import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import { TokenRegisterDto } from '@rateme/core/domain/dtos/token-auth/token-register.dto';

import { ratemeApi } from '@/shared/api';

export const passwordAuthApi = {
  login: reatomAsync(async (ctx, data: TokenLoginDto) => {
    return ratemeApi.auth.password.login(data, {
      signal: ctx.controller.signal,
    });
  }, 'passwordAuthApi.login').pipe(withAbort()),

  register: reatomAsync(async (ctx, data: TokenRegisterDto) => {
    return ratemeApi.auth.password.register(data, {
      signal: ctx.controller.signal,
    });
  }, 'passwordAuthApi.register').pipe(withAbort()),

  refresh: reatomAsync(async (ctx) => {
    return ratemeApi.auth.password.refresh({ signal: ctx.controller.signal });
  }, 'passwordAuthApi.refresh').pipe(withAbort()),

  logout: reatomAsync(async (ctx) => {
    return ratemeApi.auth.password.logout({ signal: ctx.controller.signal });
  }, 'passwordAuthApi.logout'),
};

export const sessionApi = {
  me: reatomAsync(async (ctx) => {
    return ratemeApi.session.me({ signal: ctx.controller.signal });
  }, 'sessionApi.me').pipe(withAbort()),
};
