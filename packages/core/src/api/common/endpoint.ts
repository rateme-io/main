import { HttpService } from '@/api/common/http.service';

export abstract class Endpoint {
  protected readonly httpService: HttpService;

  constructor(config: EndpointConfig) {
    this.httpService = config.httpService;
  }
}

export interface EndpointConfig {
  httpService: HttpService;
}
