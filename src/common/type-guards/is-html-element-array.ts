import { isString } from './is-string';
import { isHtmlElement } from './is-html-element';

export function isHtmlElementArray(val: unknown): val is (HTMLElement | string)[] {
  if (!Array.isArray(val)) {
    return false;
  }

  for (const item of val) {
    if (!isString(item) && !isHtmlElement(item)) {
      return false;
    }
  }

  return true;
}
