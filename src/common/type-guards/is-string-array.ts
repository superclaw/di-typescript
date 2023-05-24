import { isString } from './is-string';
import { isEntityArray } from './is-entity-array';

export function isStringArray(val: unknown): val is string[] {
  return isEntityArray<string>(val, isString);
}
