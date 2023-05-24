import { Children, ComponentInterface, Inject, View } from '../di';
import type { ChildComponent } from '../di';
import { Layout } from '../components/layout';
import { Text } from '../components/shared';

@View('*')
export class NotFound implements ComponentInterface {
  public constructor(
    @Inject(Layout) private readonly layout: ChildComponent<typeof Layout>,
    @Inject(Text) private readonly text: ChildComponent<typeof Text>,
  ) {
  }

  public render(): Children {
    return this.layout()(
      this.text({
        type: 'bold',
      })('404')
    );
  }
}
