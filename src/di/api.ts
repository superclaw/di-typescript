import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiInterface } from './interfaces';
import { isString } from '../common/type-guards';

export class Api implements ApiInterface {
  private readonly api: AxiosInstance;

  public constructor(private readonly baseUrl: string = '') {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use((response) => response.data);
  }

  public getCopy(path: string): Api {
    const copyApi = {
      ...this,
      baseUrl: this.getPath(path),
    };

    Reflect.setPrototypeOf(copyApi, this);
    return copyApi;
  }

  public async get<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  public async get<R>(config?: AxiosRequestConfig): Promise<R>;
  public async get<R>(pathOrConfig?: string | AxiosRequestConfig, maybeConfig?: AxiosRequestConfig): Promise<R> {
    const [path, config] = this.getParams(pathOrConfig, maybeConfig);
    return this.api.get<unknown, R>(path, config);
  }

  public async post<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  public async post<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  public async post<R, T = unknown>(
    pathOrData: string | T,
    dataOrConfig?: T | AxiosRequestConfig,
    maybeConfig?: AxiosRequestConfig,
  ): Promise<R> {
    const [path, data, config] = this.getParamsWithData(pathOrData, dataOrConfig, maybeConfig);
    return this.api.post<unknown, R>(path, data, config);
  }

  public async put<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  public async put<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  public async put<R, T = unknown>(
    pathOrData: string | T,
    dataOrConfig?: T | AxiosRequestConfig,
    maybeConfig?: AxiosRequestConfig,
  ): Promise<R> {
    const [path, data, config] = this.getParamsWithData(pathOrData, dataOrConfig, maybeConfig);
    return this.api.put<unknown, R>(path, data, config);
  }

  public async patch<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  public async patch<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  public async patch<R, T = unknown>(
    pathOrData: string | T,
    dataOrConfig?: T | AxiosRequestConfig,
    maybeConfig?: AxiosRequestConfig,
  ): Promise<R> {
    const [path, data, config] = this.getParamsWithData(pathOrData, dataOrConfig, maybeConfig);
    return this.api.patch<unknown, R>(path, data, config);
  }

  public async delete<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  public async delete<R>(config?: AxiosRequestConfig): Promise<R>;
  public async delete<R>(pathOrConfig?: string | AxiosRequestConfig, maybeConfig?: AxiosRequestConfig): Promise<R> {
    const [path, config] = this.getParams(pathOrConfig, maybeConfig);
    return this.api.delete<unknown, R>(path, config);
  }

  public async options<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  public async options<R>(config?: AxiosRequestConfig): Promise<R>;
  public async options<R>(pathOrConfig?: string | AxiosRequestConfig, maybeConfig?: AxiosRequestConfig): Promise<R> {
    const [path, config] = this.getParams(pathOrConfig, maybeConfig);
    return this.api.options<unknown, R>(path, config);
  }

  private getParams(
    pathOrConfig?: string | AxiosRequestConfig,
    maybeConfig?: AxiosRequestConfig,
  ): [string, AxiosRequestConfig?] {
    const path = this.getPath(pathOrConfig);
    const config = isString(pathOrConfig) ? maybeConfig : pathOrConfig;
    return [path, config];
  }

  private getParamsWithData<T>(
    pathOrData: string | T,
    dataOrConfig?: T | AxiosRequestConfig,
    maybeConfig?: AxiosRequestConfig,
  ): [string, T, AxiosRequestConfig?] {
    const path = this.getPath(pathOrData);
    const data = isString(pathOrData) ? (dataOrConfig as T) : pathOrData;
    const config = isString(pathOrData) ? maybeConfig : dataOrConfig as AxiosRequestConfig;
    return [path, data, config];
  }

  private getPath<T>(pathOrDataOrConfig: string | T | AxiosRequestConfig): string {
    const slash = this.baseUrl.endsWith('/') ? '' : '/';
    return isString(pathOrDataOrConfig) ? `${this.baseUrl}${slash}${pathOrDataOrConfig}` : this.baseUrl;
  }
}
