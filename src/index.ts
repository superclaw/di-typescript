import 'reflect-metadata';
import './assets/style/style.scss';
import { App } from './di';
import { views } from './views';

const app = new App();
const rootElement = document.getElementById('root');

app
  .useApiBaseUrl(process.env.API_URL ?? '')
  .useRouterPrefix('/')
  .useRouterViews(views)
  .start(rootElement);
