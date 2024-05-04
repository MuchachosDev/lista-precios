import {
  editDollarPage,
  manageDollarsPage,
} from '../controller/dollarView.controller.js';
import RouterBase from './index.js';

export default class DollarViewRouter extends RouterBase {
  init() {
    this.get('/manage-dollars', ['GERENTE'], manageDollarsPage);
    this.get('/edit-dollar/:did', ['GERENTE'], editDollarPage);
  }
}
