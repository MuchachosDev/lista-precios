import {
  addSupplier,
  deleteSupplier,
  editSupplier,
} from "../controller/supplier.controller.js";
import RouterBase from "./index.js";

export default class SupplierRouter extends RouterBase {
  init() {
    this.post("/", ["USER"], addSupplier);
    this.put("/:sid", ["USER"], editSupplier);
    this.delete("/:sid", ["USER"], deleteSupplier);
  }
}
