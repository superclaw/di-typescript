import { Keys, Prefix } from '../enums';
import { Container } from '../container';
import { ComponentParams } from '../interfaces';
import { ComponentFactory } from '../factories';

export function Component<K extends keyof HTMLElementTagNameMap>(params: ComponentParams<K>): ClassDecorator {
  return <T extends Function>(target: T): T => {
    const existingInstance = Container.get(`${Prefix.COMPONENT}:${target.name}`.toLowerCase());

    if (!existingInstance) {
      const factory = (): unknown => ComponentFactory.create(target, params, Prefix.COMPONENT);
      Reflect.defineMetadata(Keys.PREFIX, Prefix.COMPONENT, target);
      Reflect.defineMetadata(Keys.FACTORY, factory, target);
    }

    return target;
  };
}
