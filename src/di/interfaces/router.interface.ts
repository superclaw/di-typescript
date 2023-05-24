import { Match, NavigateOptions } from 'navigo';

export interface RouterInterface {
  currentPath: string;
  params: Match['data'];
  get query(): Match['params'];
  navigate(path: string, options?: NavigateOptions): void;
}
