import {
  addSupplierPage,
  editSupplierPage,
  manageSupplierPage,
} from '../controller/supplierView.controller.js';
import RouterBase from './index.js';

export default class SupplierViewRouter extends RouterBase {
  init() {
    this.get('/add-supplier', ['GERENTE'], addSupplierPage);
    this.get('/manage-suppliers', ['GERENTE'], manageSupplierPage);
    this.get('/edit-supplier/:sid', ['GERENTE'], editSupplierPage);
  }
}
