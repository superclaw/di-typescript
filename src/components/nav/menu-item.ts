import { Children, Component, ComponentInterface, Inject, Prop } from '../../di';
import type { ChildComponent } from '../../di';
import style from './nav.module.scss';
import { Link } from '../shared';

@Component({
  tagName: 'li',
  className: style.nav__item,
})
export class MenuItem implements ComponentInterface {
  public constructor(
    @Inject(Link) private readonly link: ChildComponent<typeof Link>,
  ) {}

  @Prop()
  public path: string;

  public render(children: Children): Children {
    return this.link({
      path: this.path,
    })(children);
  }
}
