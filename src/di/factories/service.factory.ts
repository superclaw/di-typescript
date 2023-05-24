import { InjectableFactory } from './injectable.factory';
import { Container } from '../container';
import { Prefix } from '../enums';
import { Api } from '../api';

export class ServiceFactoryStatic extends InjectableFactory {
  public create<T extends Function>(target: T, path: string = ''): unknown {
    const args = this.getArgs(target).map((arg) => (arg instanceof Api ? arg.getCopy(path) : arg));
    const instance = Reflect.construct(target, args);

    Container.register(`${Prefix.SERVICE}:${target.name}`.toLowerCase(), instance);

    return instance;
  }
}

export const ServiceFactory = new ServiceFactoryStatic();
