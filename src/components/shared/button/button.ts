import { Children, Component, ComponentInterface, Prop } from '../../../di';
import style from './button.module.scss';

@Component({
  tagName: 'button',
  className: style.button,
  attributes: {
    name: 'button-name',
    type: 'submit'
  }
})
export class Button implements ComponentInterface {
  @Prop()
  public text?: string;

  public render(children: Children): Children {
    if (this.text) {
      return this.text;
    }

    return children;
  }
}
