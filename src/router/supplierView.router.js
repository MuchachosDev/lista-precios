import {
  addSupplierPage,
  editSupplierPage,
  manageSupplierPage,
} from "../controller/supplierView.controller.js";
import RouterBase from "./index.js";

export default class SupplierViewRouter extends RouterBase {
  init() {
    this.get("/add-supplier", ["USER"], addSupplierPage);
    this.get("/manage-suppliers", ["USER"], manageSupplierPage);
    this.get("/edit-supplier/:sid", ["USER"], editSupplierPage);
  }
}
