import { HttpService } from '@/api/common/http.service';
import { AuthEndpoint } from '@/api/endpoints/auth';

export class RatemeApi {
  readonly auth: AuthEndpoint;

  constructor(private readonly config: RatemeApiConfig) {
    this.auth = new AuthEndpoint({
      httpService: this.config.httpService,
    });
  }
}

export interface RatemeApiConfig {
  httpService: HttpService;
}
