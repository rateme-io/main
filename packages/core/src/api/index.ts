export class RatemeApi {
  constructor(private readonly config: RatemeApiConfig) {
  }
}


export interface RatemeApiConfig {
  baseUrl: string;
}