import { getIncompletePage } from "../controller/errors.controller.js";
import RouterBase from "./index.js";

export default class ErrorViewRouter extends RouterBase {
  init() {
    this.get("/incomplete", ["USER"], getIncompletePage);
  }
}
