import { ClassConstructor } from '../common/interfaces';
import { ComponentInterface } from '../di';
import { Home } from './home';
import { About } from './about';
import { NotFound } from './not-found';

export const views: ClassConstructor<ComponentInterface>[] = [Home, About, NotFound];
