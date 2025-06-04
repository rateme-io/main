import { Endpoint, EndpointConfig } from '@/api/common/endpoint';

import { PasswordAuthEndpoint } from './password-auth.endpoint';

export class AuthEndpoint extends Endpoint {
  readonly password: PasswordAuthEndpoint;

  constructor(config: EndpointConfig) {
    super(config);

    this.password = new PasswordAuthEndpoint(config);
  }
}
