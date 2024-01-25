import {
  getHomePage,
  getListProductsPage,
  getUploadDocumentPage,
} from "../controller/productView.controller.js";
import RouterBase from "./index.js";

export default class ProductViewRouter extends RouterBase {
  init() {
    this.get("/upload-document", ["USER"], getUploadDocumentPage);
    this.get("/list-products", ["USER"], getListProductsPage);
    this.get("/", ["USER"], getHomePage);
  }
}
