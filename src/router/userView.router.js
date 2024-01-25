import { loginPage } from "../controller/userView.controller.js";
import RouterBase from "./index.js";

export default class UserViewRouter extends RouterBase {
  init() {
    this.get("/login", ["NOAUTH"], loginPage);
  }
}
