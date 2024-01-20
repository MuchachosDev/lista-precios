import {
  addSupplierPage,
  editSupplierPage,
  manageSupplierPage,
} from "../controller/supplierView.controller.js";
import RouterBase from "./index.js";

export default class SupplierViewRouter extends RouterBase {
  init() {
    this.get("/add-supplier", ["PUBLIC"], addSupplierPage);
    this.get("/manage-suppliers", ["PUBLIC"], manageSupplierPage);
    this.get("/edit-supplier/:sid", ["PUBLIC"], editSupplierPage);
  }
}
