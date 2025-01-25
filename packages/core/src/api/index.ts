import { EndpointConfig } from '@/api/common/endpoint';
import { HttpService } from '@/api/common/http.service';
import { AuthEndpoint } from '@/api/endpoints/auth';
import { SessionEndpoint } from '@/api/endpoints/session';

export class RatemeApi {
  readonly auth: AuthEndpoint;
  readonly session: SessionEndpoint;

  constructor(private readonly config: RatemeApiConfig) {
    const endpointsConfig: EndpointConfig = {
      httpService: this.config.httpService,
    };

    this.auth = new AuthEndpoint(endpointsConfig);
    this.session = new SessionEndpoint(endpointsConfig);
  }
}

export interface RatemeApiConfig {
  httpService: HttpService;
}
