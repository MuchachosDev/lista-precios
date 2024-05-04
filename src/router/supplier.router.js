import {
  addSupplier,
  deleteSupplier,
  editSupplier,
} from '../controller/supplier.controller.js';
import RouterBase from './index.js';

export default class SupplierRouter extends RouterBase {
  init() {
    this.post('/', ['GERENTE'], addSupplier);
    this.put('/:sid', ['GERENTE'], editSupplier);
    this.delete('/:sid', ['GERENTE'], deleteSupplier);
  }
}
