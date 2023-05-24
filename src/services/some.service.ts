import { Api, Inject, Service } from '../di';
import type { ApiInterface } from '../di';

@Service('some')
export class SomeService {
  public constructor(
    @Inject(Api) private readonly api: ApiInterface,
  ) {}

  public async getSome(): Promise<void> {
    try {
      await this.api.get();
    } catch (e) {
      console.error(e);
    } finally {
      console.log('done!');
    }
  }
}
