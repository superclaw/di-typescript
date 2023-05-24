import { isObject } from '../../common/type-guards';
import { ComponentParams } from '../interfaces';

class ElementFactoryStatic {
  public create<T extends keyof HTMLElementTagNameMap>(params: ComponentParams<T>): HTMLElementTagNameMap[T] {
    const element = document.createElement(params.tagName);

    this.applyClassName(element, params.className);
    this.applyProperties(element, params.properties);
    this.applyAttributes(element, params.attributes);

    return element;
  }

  private applyClassName(element: HTMLElement, className?: string | string[]): void {
    if (!className?.length) return;

    element.classList.add(...(Array.isArray(className) ? className : [className]));
  }

  private applyProperties<T>(element: T, properties?: Record<string, unknown>): void {
    if (!isObject(element) || !properties) return;

    Object.entries(properties).forEach(([key, val]) => {
      if (isObject(val)) {
        ElementFactory.applyProperties(element[key], val);
      } else {
        Reflect.set(element, key, val);
      }
    });
  }

  private applyAttributes(element: HTMLElement, attributes?: Record<string, string>): void {
    if (!attributes) return;

    Object.entries(attributes).forEach(([key, val]) => {
      element.setAttribute(key, val);
    });
  }
}

export const ElementFactory = new ElementFactoryStatic();
