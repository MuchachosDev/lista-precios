import RouterBase from './index.js';
import { changeCurrency } from '../controller/currency.controller.js';

export default class CurrencyRouter extends RouterBase {
  init() {
    this.post('/:did', ['MANAGER'], changeCurrency);
  }
}
