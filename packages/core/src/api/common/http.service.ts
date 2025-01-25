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
  signal: AbortSignal;
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
  error: HttpServiceError | null;
  headers: object;
}

export class HttpServiceError extends Error {
  public readonly type: string;
  public readonly status: number;
  public readonly statusText: string;

  constructor({
    message,
    type,
    status,
    statusText,
  }: {
    message: string;
    type: string;
    status: number;
    statusText: string;
  }) {
    super(message);

    this.type = type;
    this.status = status;
    this.statusText = statusText;
  }
}
