import { Keys, Prefix } from '../enums';
import { ComponentFactory } from '../factories';

export function Inject<T extends Function>(entity: T): ParameterDecorator {
  return (target, _, idx) => {
    const injection = Reflect.getMetadata(Keys.INJECTION, target) ?? [];
    const prefix = Reflect.getMetadata(Keys.PREFIX, entity) ?? 'di';
    const isComponent = [Prefix.COMPONENT, Prefix.VIEW].includes(prefix);
    const entityFactory = (): unknown => Reflect.getMetadata(Keys.FACTORY, entity)?.();

    const factory = isComponent
      ? (): unknown => ComponentFactory.createCurriedRender(entityFactory())
      : (): unknown => entityFactory();

    injection[idx] = {
      name: entity.name,
      factory,
    };

    Reflect.defineMetadata(Keys.INJECTION, injection, target);
  };
}
