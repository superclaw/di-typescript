import { Children, Component, ComponentInterface, Inject } from '../../di';
import type { ChildComponent } from '../../di';
import style from './send-form.module.scss';
import { Button } from '../shared';
import { SomeService } from '../../services';

@Component({
  tagName: 'form',
  className: style.sendForm,
})
export class SendForm implements ComponentInterface {
  public constructor(
    @Inject(Button) private readonly button: ChildComponent<typeof Button>,
    private readonly someService: SomeService,
  ) {}

  public render(): Children {
    this.someService.getSome();
    const firstBtn = this.button();
    const secondBtn = this.button({ text: 'Переданный в props текст' });

    return [
      firstBtn('Нажми меня'),
      secondBtn('Этот текст не отобразится'),
    ];
  }
}
