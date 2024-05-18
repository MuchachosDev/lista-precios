import RouterBase from './index.js';
import {
  addCurrency,
  changeCurrency,
} from '../controller/currency.controller.js';

export default class CurrencyRouter extends RouterBase {
  init() {
    this.post('/', ['MANAGER'], addCurrency);
    this.put('/:did', ['MANAGER'], changeCurrency);
  }
}
