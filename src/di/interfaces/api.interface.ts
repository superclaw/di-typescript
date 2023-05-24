import { AxiosRequestConfig } from 'axios';

export interface ApiInterface {
  get<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  get<R>(config?: AxiosRequestConfig): Promise<R>;
  post<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  post<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  put<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  put<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  patch<R, T = unknown>(path: string, data: T, config?: AxiosRequestConfig): Promise<R>;
  patch<R, T = unknown>(data: T, config?: AxiosRequestConfig): Promise<R>;
  delete<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  delete<R>(config?: AxiosRequestConfig): Promise<R>;
  options<R>(path: string, config?: AxiosRequestConfig): Promise<R>;
  options<R>(config?: AxiosRequestConfig): Promise<R>;
}
