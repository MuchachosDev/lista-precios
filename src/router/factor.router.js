import {
  addFactor,
  deleteFactor,
  editFactor,
} from "../controller/factor.controller.js";
import RouterBase from "./index.js";

export default class FactorRouter extends RouterBase {
  init() {
    this.post("/", ["USER"], addFactor);
    this.put("/:fid", ["USER"], editFactor);
    this.delete("/:fid", ["USER"], deleteFactor);
  }
}
