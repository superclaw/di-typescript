import { Keys } from '../enums';
import { isFunction, isNotNull } from '../../common/type-guards';
import { Container } from '../container';

export abstract class InjectableFactory {
  public abstract create<T extends Function>(target: T, ...args: unknown[]): unknown;

  protected getArgs<T extends Function>(target: T): unknown[] {
    const injection: ({ name: string; factory: () => unknown } | undefined)[] =
      Reflect.getMetadata(Keys.INJECTION, target) ?? [];

    const paramTypes = Reflect.getMetadata('design:paramtypes', target) ?? [];
    const args: unknown[] = [];

    paramTypes.forEach((param: unknown, idx: number) => {
      const injectionItem = injection[idx];
      const { name, dependency } = this.resolve(injectionItem, param);

      if (!dependency) {
        throw new Error(`Dependency "${name}" was not found`);
      }

      args[idx] = dependency;
    });

    return args;
  }

  private resolve(
    injectionItem: { name: string; factory: () => unknown } | undefined,
    param: unknown,
  ): { name: string; dependency: unknown } {
    if (isFunction(param) && !isNotNull(injectionItem?.factory)) {
      const prefix = Reflect.getMetadata(Keys.PREFIX, param);
      const instance = Container.get(`${prefix}:${param.name}`.toLowerCase());

      return {
        name: param.name,
        dependency: instance ?? Reflect.getMetadata(Keys.FACTORY, param)?.(),
      };
    }

    return {
      name: injectionItem?.name ?? 'Unknown',
      dependency: injectionItem?.factory(),
    };
  }
}
