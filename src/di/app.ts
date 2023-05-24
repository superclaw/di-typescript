import { Router } from './router';
import { ComponentInterface } from './interfaces';
import { ClassConstructor } from '../common/interfaces';
import { Api } from './api';
import { Container } from './container';
import { Keys } from './enums';

export class App {
  private views: ClassConstructor<ComponentInterface>[] = [];
  private routerPrefix: string = '';
  private apiBaseUrl: string = '';

  public useApiBaseUrl(baseUrl: string): App {
    this.apiBaseUrl = baseUrl;
    return this;
  }

  public useRouterViews(views: ClassConstructor<ComponentInterface>[]): App {
    this.views = views;
    return this;
  }

  public useRouterPrefix(prefix: string): App {
    this.routerPrefix = prefix;
    return this;
  }

  public start(rootElement: HTMLElement | null): void {
    if (!rootElement) {
      throw new Error('root element was not found');
    }

    const api = new Api(this.apiBaseUrl);
    const router = new Router(this.routerPrefix);

    Container.register(Keys.API, api);
    Container.register(Keys.ROUTER, router);
    Reflect.defineMetadata(Keys.FACTORY, () => api, Api);
    Reflect.defineMetadata(Keys.FACTORY, () => router, Router);
    router.setViews(this.views, rootElement);
    router.start();
  }
}
