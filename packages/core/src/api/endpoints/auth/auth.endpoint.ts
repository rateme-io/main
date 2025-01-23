import { Endpoint, EndpointConfig } from '@/api/common/endpoint';

import { TokenAuthEndpoint } from './token-auth.endpoint';

export class AuthEndpoint extends Endpoint {
  readonly token: TokenAuthEndpoint;

  constructor(config: EndpointConfig) {
    super(config);

    this.token = new TokenAuthEndpoint(config);
  }
}
