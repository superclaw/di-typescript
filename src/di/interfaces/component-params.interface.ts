import { ComponentParamsKey } from '../interfaces';
import { DeepPartial } from '../../common/interfaces';

export interface ComponentParams<K extends keyof HTMLElementTagNameMap> {
  tagName: K;
  className?: string | string[];
  properties?: DeepPartial<Pick<HTMLElementTagNameMap[K], ComponentParamsKey>>;
  attributes?: Record<string, string>;
}
