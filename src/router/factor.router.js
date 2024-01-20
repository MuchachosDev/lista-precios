import {
  addFactor,
  deleteFactor,
  editFactor,
} from "../controller/factor.controller.js";
import RouterBase from "./index.js";

export default class FactorRouter extends RouterBase {
  init() {
    this.post("/", ["PUBLIC"], addFactor);
    this.put("/:fid", ["PUBLIC"], editFactor);
    this.delete("/:fid", ["PUBLIC"], deleteFactor);
  }
}
