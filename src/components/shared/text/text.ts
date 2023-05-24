import { Children, Component, ComponentInterface, Prop } from '../../../di';
import style from './text.module.scss';

@Component({
  tagName: 'span',
})
export class Text implements ComponentInterface {
  private className = [style.text];

  @Prop()
  public type: 'regular' | 'bold' | 'medium' = 'medium';

  public render(children: Children): Children {
    switch (this.type) {
      case 'regular':
        this.className.push(style.text_regular);
        break;
      case 'bold':
        this.className.push(style.text_bold);
        break;
      case 'medium':
        this.className.push(style.text_medium);
        break;
    }

    return children;
  }
}
