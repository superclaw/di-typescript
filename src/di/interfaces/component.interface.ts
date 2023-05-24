import { Children } from '.';

export interface ComponentInterface {
  render?(children: Children): Children;
}
