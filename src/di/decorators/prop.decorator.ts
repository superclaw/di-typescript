import { Keys } from '../enums';
import { isStringArray } from '../../common/type-guards';

export function Prop(): PropertyDecorator {
  return (target, propertyKey) => {
    let props: string[] | null = Reflect.getMetadata(Keys.PROPS, target);
    if (!isStringArray(props)) props = [];

    props.push(String(propertyKey));
    Reflect.defineMetadata(Keys.PROPS, props, target);
  };
}
