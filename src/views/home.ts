import { View, ComponentInterface, Children, Inject } from '../di';
import type { ChildComponent } from '../di';
import { SendForm } from '../components/send-form/send-form';
import { Layout } from '../components/layout';

@View('/')
export class Home implements ComponentInterface {
  public constructor(
    @Inject(Layout) private readonly layout: ChildComponent<typeof Layout>,
    @Inject(SendForm) private readonly sendForm: ChildComponent<typeof SendForm>,
  ) {}

  public render(): Children {
    return this.layout()(this.sendForm()());
  }
}
