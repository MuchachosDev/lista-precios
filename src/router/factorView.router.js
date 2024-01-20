import {
  addFactorPage,
  editFactorPage,
  manageFactorsPage,
} from "../controller/factorView.controller.js";
import RouterBase from "./index.js";

export default class FactorViewRouter extends RouterBase {
  init() {
    this.get("/add-factor", ["PUBLIC"], addFactorPage);
    this.get("/manage-factors", ["PUBLIC"], manageFactorsPage);
    this.get("/edit-factor/:fid", ["PUBLIC"], editFactorPage);
  }
}
