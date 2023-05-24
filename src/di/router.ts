import Navigo, { Match, NavigateOptions } from 'navigo';
import { ComponentInterface, RouterInterface } from './interfaces';
import { ClassConstructor } from '../common/interfaces';
import { Container } from './container';
import { Keys, Prefix } from './enums';
import { isFunction, isHtmlElement, isHtmlElementArray, isObject, isString } from '../common/type-guards';

export class Router implements RouterInterface {
  private readonly router: Navigo;

  public constructor(prefix = '/') {
    this.router = new Navigo(prefix, {
      hash: true,
    });
  }

  public currentPath: string = '/';
  public params: Match['data'] = {};

  public setViews(views: ClassConstructor<ComponentInterface>[], rootElement: HTMLElement): void {
    for (const view of views) {
      const instance = Container.get(`${Prefix.VIEW}:${view.name}`.toLowerCase());
      const route = instance ?? Reflect.getMetadata(Keys.FACTORY, view)?.();
      const path = Reflect.getMetadata(Keys.VIEW_PATH, view);

      if (!isString(path) || !isObject(route) || !isFunction(route.render)) {
        continue;
      }

      const handler = this.makeHandler(route, rootElement, route.render);

      if (path === '*') {
        this.router.notFound(handler);
        continue;
      }

      this.router.on(path, handler, {
        before: (done, match) => {
          this.currentPath = '/' + match.url;
          this.params = match.data ?? {};
          done();
        },
      });
    }
  }

  private makeHandler(route: ComponentInterface, rootElement: HTMLElement, render: () => unknown): () => void {
    return () => {
      const renderElement = render.apply(route);

      if (rootElement && (isHtmlElement(renderElement) || isHtmlElementArray(renderElement))) {
        rootElement.innerHTML = '';

        if (isHtmlElementArray(renderElement)) {
          rootElement.append(...renderElement);
        } else {
          rootElement.append(renderElement);
        }
      }
    };
  }

  public start(): void {
    this.router.resolve();
  }

  public get query(): Match['params'] {
    return this.location.params;
  }

  private get location(): Match {
    return this.router.getCurrentLocation();
  }

  public navigate(path: string, options?: NavigateOptions): void {
    this.router.navigate(path, options);
  }
}
