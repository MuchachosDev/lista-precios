import RouterBase from './index.js';
import { changeDollar } from '../controller/dollar.controller.js';

export default class DollarRouter extends RouterBase {
  init() {
    this.post('/:did', ['GERENTE'], changeDollar);
  }
}
