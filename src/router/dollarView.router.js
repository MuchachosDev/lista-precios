import { getDollarPage } from "../controller/dollarView.controller.js";
import RouterBase from "./index.js";

export default class DollarViewRouter extends RouterBase {
  init() {
    this.get("/edit-dollar", ["PUBLIC"], getDollarPage);
  }
}
