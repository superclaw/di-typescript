import { Children, Component, ComponentInterface, Prop } from '../../../di';

@Component({
  tagName: 'a',
  properties: {
    dataset: {
      navigo: '',
    },
  },
})
export class Link implements ComponentInterface {
  private attributes: {
    href: string;
  }

  @Prop()
  public path: string;

  public render(children: Children): Children {
    this.attributes = {
      href: this.path,
    };

    return children;
  }
}
