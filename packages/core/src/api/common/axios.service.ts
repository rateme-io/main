import { AxiosError, AxiosInstance } from 'axios';

import {
  HttpService,
  HttpServiceOptions,
  HttpServiceRequest,
  HttpServiceResponse,
} from '@/api/common/http.service';

export class AxiosService implements HttpService {
  constructor(private readonly instance: AxiosInstance) {}

  async request<T>({
    url,
    method,
    options,
  }: HttpServiceRequest): Promise<HttpServiceResponse<T>> {
    try {
      const response = await this.instance.request({
        method,
        url,
        data: options.data,
        params: options.params,
        headers: options.headers,
      });

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: { ...(response?.headers ?? {}) },
        error: null,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          data: null,
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: { ...(error.response?.headers ?? {}) },
          error: error.cause ?? new Error('Unknown error', { cause: error }),
        };
      }

      return {
        data: null,
        headers: {},
        error: new Error('Unknown error', { cause: error }),
      };
    }
  }

  get<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>> {
    return this.request<T>({ url, method: 'GET', options });
  }
  post<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>> {
    return this.request<T>({ url, method: 'POST', options });
  }
  put<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>> {
    return this.request<T>({ url, method: 'PUT', options });
  }
  patch<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>> {
    return this.request<T>({ url, method: 'PATCH', options });
  }
  delete<T>(
    url: string,
    options: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>> {
    return this.request<T>({ url, method: 'DELETE', options });
  }
}
