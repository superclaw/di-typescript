import { Keys, Prefix } from '../enums';
import { Container } from '../container';
import { ComponentFactory } from '../factories';

export function View(path: string): ClassDecorator {
  return <T extends Function>(target: T) => {
    const existingInstance = Container.get(`${Prefix.VIEW}:${target.name}`.toLowerCase());

    if (!existingInstance) {
      Reflect.defineMetadata(Keys.PREFIX, Prefix.VIEW, target);
      Reflect.defineMetadata(Keys.VIEW_PATH, path, target);

      Reflect.defineMetadata(
        Keys.FACTORY,
        () =>
          ComponentFactory.create(
            target,
            {
              tagName: 'div',
            },
            Prefix.VIEW,
          ),
        target,
      );
    }

    return target;
  };
}
