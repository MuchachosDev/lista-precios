import { addSupplier } from "../controller/supplier.controller.js";
import RouterBase from "./index.js";

export default class SupplierRouter extends RouterBase {
  init() {
    this.post("/", ["PUBLIC"], addSupplier);
  }
}
