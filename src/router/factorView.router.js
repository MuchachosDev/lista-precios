import { addFactorPage } from "../controller/factorView.controller.js";
import RouterBase from "./index.js";

export default class FactorViewRouter extends RouterBase {
  init() {
    this.get("/add-factor", ["PUBLIC"], addFactorPage);
  }
}
