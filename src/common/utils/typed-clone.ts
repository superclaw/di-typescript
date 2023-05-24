import { isFunction, isNotNull, isObject } from '../type-guards';

export function typedClone<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return <T>[...obj.map(typedClone)];
  }

  if (!isNotNull(obj) || !isObject(obj) || isFunction(obj)) {
    return obj;
  }

  const newObject: Record<string, unknown> = Object.assign({}, obj);

  Object.keys(newObject).forEach((key) => {
    newObject[key] = typedClone(newObject[key]);
  });

  Reflect.setPrototypeOf(newObject, obj);

  return <T>newObject;
}
