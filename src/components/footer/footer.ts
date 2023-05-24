import { Children, Component, ComponentInterface, Inject } from '../../di';
import type { ChildComponent } from '../../di';
import style from './footer.module.scss';
import { Text } from '../shared';

@Component({
  tagName: 'footer',
  className: style.footer,
})
export class Footer implements ComponentInterface {
  public constructor(
    @Inject(Text) private readonly text: ChildComponent<typeof Text>,
  ) {}

  public render(): Children {
    return this.text({
      type: 'bold',
    })('Место для футера');
  }
}
