export interface HttpService {
  get<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>;
  post<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>;
  put<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>;
  patch<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>;
  delete<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>;
  request<T>(request: HttpServiceRequest): Promise<HttpServiceResponse<T>>;
}

export interface HttpServiceOptions {
  data?: object;
  params?: object;
  headers?: object;
}

export interface HttpServiceRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  options: HttpServiceOptions;
}

export interface HttpServiceResponse<Data> {
  data: Data | null;
  status?: number;
  statusText?: string;
  error: Error | null;
  headers: object;
}
