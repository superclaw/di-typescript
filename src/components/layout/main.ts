import { Component, ComponentInterface } from '../../di';
import style from './layout.module.scss';

@Component({
  tagName: 'main',
  className: style.main,
})
export class Main implements ComponentInterface {}
