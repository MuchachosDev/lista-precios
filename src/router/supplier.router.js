import {
  addSupplier,
  deleteSupplier,
  editSupplier,
} from '../controller/supplier.controller.js';
import RouterBase from './index.js';

export default class SupplierRouter extends RouterBase {
  init() {
    this.post('/', ['MANAGER'], addSupplier);
    this.put('/:sid', ['MANAGER'], editSupplier);
    this.delete('/:sid', ['MANAGER'], deleteSupplier);
  }
}
