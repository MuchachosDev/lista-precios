import {
  addFactor,
  deleteFactor,
  editFactor,
} from "../controller/factor.controller.js";
import RouterBase from "./index.js";

export default class FactorRouter extends RouterBase {
  init() {
    this.post("/", ["GERENTE"], addFactor);
    this.put("/:fid", ["GERENTE"], editFactor);
    this.delete("/:fid", ["GERENTE"], deleteFactor);
  }
}
