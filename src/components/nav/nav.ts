import { Component, ComponentInterface } from '../../di';
import style from './nav.module.scss';

@Component({
  tagName: 'nav',
  className: style.nav__container,
})
export class Nav implements ComponentInterface {}
