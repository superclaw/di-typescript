import { ComponentProps, Children } from '.';

export interface ChildComponent<T extends Function> {
  (props?: ComponentProps<T>): (...children: Children[]) => HTMLElement;
}
