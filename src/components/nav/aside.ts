import { Children, Component, ComponentInterface, Inject } from '../../di';
import type { ChildComponent } from '../../di';
import style from './nav.module.scss';
import { Menu } from './menu';
import { Nav } from './nav';

@Component({
  tagName: 'aside',
  className: style.nav,
})
export class Aside implements ComponentInterface {
  public constructor(
    @Inject(Menu) private readonly menu: ChildComponent<typeof Menu>,
    @Inject(Nav) private readonly nav: ChildComponent<typeof Nav>,
  ) {}

  public render(): Children {
    return this.nav()(this.menu()())
  }
}
