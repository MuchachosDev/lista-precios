import {
  getHomePage,
  getListProductsPage,
  getUploadDocumentPage,
} from "../controller/productView.controller.js";
import RouterBase from "./index.js";

export default class ProductViewRouter extends RouterBase {
  init() {
    this.get("/upload-document", ["PUBLIC"], getUploadDocumentPage);
    this.get("/list-products", ["PUBLIC"], getListProductsPage);
    this.get("/", ["PUBLIC"], getHomePage);
  }
}
