import {
  addFactorPage,
  editFactorPage,
  manageFactorsPage,
} from "../controller/factorView.controller.js";
import RouterBase from "./index.js";

export default class FactorViewRouter extends RouterBase {
  init() {
    this.get("/add-factor", ["GERENTE"], addFactorPage);
    this.get("/manage-factors", ["GERENTE"], manageFactorsPage);
    this.get("/edit-factor/:fid", ["GERENTE"], editFactorPage);
  }
}
