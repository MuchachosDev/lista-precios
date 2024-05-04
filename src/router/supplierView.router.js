import {
  addSupplierPage,
  editSupplierPage,
  manageSupplierPage,
} from '../controller/supplierView.controller.js';
import RouterBase from './index.js';

export default class SupplierViewRouter extends RouterBase {
  init() {
    this.get('/add-supplier', ['MANAGER'], addSupplierPage);
    this.get('/manage-suppliers', ['MANAGER'], manageSupplierPage);
    this.get('/edit-supplier/:sid', ['MANAGER'], editSupplierPage);
  }
}
