import { login } from "../controller/user.controller.js";
import RouterBase from "./index.js";

export default class UserRouter extends RouterBase {
  init() {
    this.post("/login", ["NOAUTH"], login);
  }
}
