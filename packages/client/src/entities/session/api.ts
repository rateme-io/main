import { reatomAsync } from '@reatom/framework';

import { TokenLoginDto } from '@rateme/core/domain/dtos/token-auth/token-login.dto';

import { ratemeApi } from '@/shared/api';

export const tokenAuthApi = {
  login: reatomAsync(async (ctx, data: TokenLoginDto) => {
    const result = await ctx.schedule(() => ratemeApi.auth.token.login(data));

    console.log(result);

    return result;
  }, 'tokenAuthApi.login'),
};
