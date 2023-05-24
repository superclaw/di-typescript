import { Children, Component, ComponentInterface, Inject } from '../../di';
import { Header } from '../header';
import type { ChildComponent } from '../../di';
import style from './layout.module.scss';
import { Aside } from '../nav';
import { Footer } from '../footer';
import { Content } from './content';
import { Main } from './main';

@Component({
  tagName: 'div',
  className: style.layout,
})
export class Layout implements ComponentInterface {
  public constructor(
    @Inject(Header) private readonly header: ChildComponent<typeof Header>,
    @Inject(Aside) private readonly nav: ChildComponent<typeof Aside>,
    @Inject(Footer) private readonly footer: ChildComponent<typeof Footer>,
    @Inject(Content) private readonly content: ChildComponent<typeof Content>,
    @Inject(Main) private readonly main: ChildComponent<typeof Main>,
  ) {}

  public render(children: Children): Children {
    return [
      this.header()(),
      this.content()(
        this.nav()(),
        this.main()(children),
      ),
      this.footer()(),
    ];
  }
}
