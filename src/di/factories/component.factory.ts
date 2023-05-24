import { Children, ComponentParams } from '../interfaces';
import { ElementFactory } from './element.factory';
import {
  isFunction,
  isHtmlElement,
  isHtmlElementArray,
  isObject,
  isObjectProperty,
  isStringArray,
} from '../../common/type-guards';
import { Container } from '../container';
import { InjectableFactory } from './injectable.factory';
import { Keys } from '../enums';
import { typedClone } from '../../common/utils';

class ComponentFactoryStatic extends InjectableFactory {
  public create<T extends Function, K extends keyof HTMLElementTagNameMap>(
    target: T,
    params: ComponentParams<K>,
    prefix: string,
  ): unknown {
    const args = this.getArgs(target);
    const instance = Reflect.construct(target, args);

    if (!isFunction(instance.render)) {
      instance.render = (children: Children): Children => children;
    }

    instance.render = new Proxy(instance.render, this.createProxyHandler(params));
    Container.register(`${prefix}:${target.name}`.toLowerCase(), instance);

    return instance;
  }

  public createCurriedRender(
    instance: unknown,
  ): (props?: Record<string, unknown> | undefined) => (...children: Children[]) => HTMLElement {
    return (props) => {
      if (!isObject(instance)) {
        return () => document.createElement('div');
      }

      const propKeys = Reflect.getMetadata(Keys.PROPS, instance);
      const propObject: Record<string, unknown> = {};

      if (isStringArray(propKeys)) {
        propKeys.forEach((key) => {
          const val = isObject(props) ? props[key] : undefined;
          propObject[key] = val ?? Reflect.get(instance, key);
        });
      }

      const child: Record<string, unknown> = typedClone({ ...instance, ...propObject });

      return (...children: Children[]) => {
        if (!isObjectProperty('render', child) || !isFunction(child.render)) {
          return document.createElement('div');
        }

        const element = child.render.apply(child, children.length === 1 ? [children[0]] : [children]);

        if (!(element instanceof HTMLElement)) {
          return document.createElement('div');
        }

        return element;
      };
    };
  }

  private createProxyHandler<T extends Function, K extends keyof HTMLElementTagNameMap>(
    params: ComponentParams<K>,
  ): ProxyHandler<(children: Children) => Children> {
    return {
      apply(renderTarget: (children: Children) => Children, thisArg: T, args: [Children]): HTMLElement {
        const childElement: unknown = renderTarget.apply(thisArg, args);
        const parentElement = ElementFactory.create({ ...params, ...thisArg });

        if (isHtmlElementArray(childElement)) {
          parentElement.append(...childElement);
        } else if (isHtmlElement(childElement)) {
          parentElement.append(childElement);
        }

        return parentElement;
      },
    };
  }
}

export const ComponentFactory = new ComponentFactoryStatic();
