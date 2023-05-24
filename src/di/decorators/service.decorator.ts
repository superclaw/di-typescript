import { Container } from '../container';
import { Keys, Prefix } from '../enums';
import { ServiceFactory } from '../factories';

export function Service(path?: string): ClassDecorator {
  return <T extends Function>(target: T): T => {
    const existingInstance = Container.get(`${Prefix.SERVICE}:${target.name}`.toLowerCase());

    if (!existingInstance) {
      Reflect.defineMetadata(Keys.PREFIX, Prefix.SERVICE, target);
      Reflect.defineMetadata(Keys.FACTORY, () => ServiceFactory.create(target, path), target);
    }

    return target;
  };
}
