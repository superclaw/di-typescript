import { Component, ComponentInterface } from '../../di';
import style from './layout.module.scss';

@Component({
  tagName: 'div',
  className: style.content,
})
export class Content implements ComponentInterface {}
