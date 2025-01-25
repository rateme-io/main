import { Endpoint, EndpointMethodOptions } from '@/api/common/endpoint';
import { SessionResponseDto } from '@/domain/dtos/session/session-response.dto';
import {
  TokenLoginDto,
  TokenLoginDtoSchema,
} from '@/domain/dtos/token-auth/token-login.dto';
import {
  TokenRegisterDto,
  TokenRegisterDtoSchema,
} from '@/domain/dtos/token-auth/token-register.dto';

export class TokenAuthEndpoint extends Endpoint {
  async login(dto: TokenLoginDto, options: EndpointMethodOptions) {
    TokenLoginDtoSchema.parse(dto);

    return this.httpService.post<SessionResponseDto>('/auth/token/login', {
      data: dto,
      signal: options.signal,
    });
  }

  async register(dto: TokenRegisterDto, options: EndpointMethodOptions) {
    TokenRegisterDtoSchema.parse(dto);

    return this.httpService.post<SessionResponseDto>('/auth/token/register', {
      data: dto,
      signal: options.signal,
    });
  }

  async refresh(options: EndpointMethodOptions) {
    return this.httpService.post<SessionResponseDto>('/auth/token/refresh', {
      signal: options.signal,
    });
  }

  async logout(options: EndpointMethodOptions) {
    return this.httpService.post<void>('/auth/token/logout', {
      signal: options.signal,
    });
  }
}
