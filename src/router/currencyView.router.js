import {
  editCurrencyPage,
  manageCurrencysPage,
} from '../controller/currencyView.controller.js';
import RouterBase from './index.js';

export default class CurrencyViewRouter extends RouterBase {
  init() {
    this.get('/manage-currencys', ['MANAGER'], manageCurrencysPage);
    this.get('/edit-currency/:did', ['MANAGER'], editCurrencyPage);
  }
}
