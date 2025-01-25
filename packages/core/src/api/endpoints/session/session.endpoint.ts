import {
  Endpoint,
  EndpointConfig,
  EndpointMethodOptions,
} from '@/api/common/endpoint';
import { SessionResponseDto } from '@/domain/dtos/session/session-response.dto';

export class SessionEndpoint extends Endpoint {
  constructor(config: EndpointConfig) {
    super(config);
  }

  async me(options: EndpointMethodOptions) {
    return await this.httpService.get<SessionResponseDto>('/session/me', {
      signal: options.signal,
    });
  }
}
