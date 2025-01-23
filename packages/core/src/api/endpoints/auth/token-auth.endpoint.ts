import { Endpoint } from '@/api/common/endpoint';
import {
  TokenLoginDto,
  TokenLoginDtoSchema,
} from '@/domain/dtos/token-auth/token-login.dto';
import { TokenSessionDto } from '@/domain/dtos/token-auth/token-session.dto';

export class TokenAuthEndpoint extends Endpoint {
  async login(dto: TokenLoginDto) {
    TokenLoginDtoSchema.parse(dto);

    return this.httpService.post<TokenSessionDto>('/auth/token/login', {
      data: dto,
    });
  }
}
