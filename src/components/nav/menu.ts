import { Children, Component, ComponentInterface, Inject } from '../../di';
import type { ChildComponent } from '../../di';
import { MenuItem } from './menu-item';
import style from './nav.module.scss';
import { Text } from '../shared';

@Component({
  tagName: 'ul',
  className: style.nav__list,
})
export class Menu implements ComponentInterface {
  public constructor(
    @Inject(MenuItem) private readonly item: ChildComponent<typeof MenuItem>,
    @Inject(Text) private readonly text: ChildComponent<typeof Text>,
  ) {}

  public render(): Children {
    return [
      this.item({
        path: '/',
      })(
        this.text({
          type: 'regular',
        })('Главная'),
      ),
      this.item({
        path: '/about',
      })(
        this.text({
          type: 'regular',
        })('Описание'),
      ),
    ];
  }
}
