import { addFactor } from "../controller/factor.controller.js";
import RouterBase from "./index.js";

export default class FactorRouter extends RouterBase {
  init() {
    this.post("/", ["PUBLIC"], addFactor);
  }
}
