import {
  addFactorPage,
  editFactorPage,
  manageFactorsPage,
} from "../controller/factorView.controller.js";
import RouterBase from "./index.js";

export default class FactorViewRouter extends RouterBase {
  init() {
    this.get("/add-factor", ["USER"], addFactorPage);
    this.get("/manage-factors", ["USER"], manageFactorsPage);
    this.get("/edit-factor/:fid", ["USER"], editFactorPage);
  }
}
