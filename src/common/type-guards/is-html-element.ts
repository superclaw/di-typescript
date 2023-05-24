import { isString } from './is-string';

export function isHtmlElement(val: unknown): val is HTMLElement | string {
  return isString(val) || val instanceof HTMLElement;
}
