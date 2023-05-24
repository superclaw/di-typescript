import { Children, Component, ComponentInterface, Inject } from '../../di';
import style from './header.module.scss';
import type { ChildComponent } from '../../di';
import { Link, Text } from '../shared';

@Component({
  tagName: 'header',
  className: style.header,
})
export class Header implements ComponentInterface {
  public constructor(
    @Inject(Link) private readonly link: ChildComponent<typeof Link>,
    @Inject(Text) private readonly text: ChildComponent<typeof Text>,
  ) {}

  public render(): Children {
    return [
      this.link({
        path: '/',
      })(
        this.text({
          type: 'bold',
        })('Место для логотипа')
      ),
      this.link({
        path: '/',
      })(
        this.text({
          type: 'regular',
        })('Место для кнопки профиля')
      )
    ];
  }
}
