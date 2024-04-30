import {
  getHomePage,
  getListProductsPage,
  getUpdatePricesListPage,
  getUploadDocumentPage,
} from "../controller/productView.controller.js";
import RouterBase from "./index.js";

export default class ProductViewRouter extends RouterBase {
  init() {
    this.get("/upload-document", ["GERENTE"], getUploadDocumentPage);
    this.get("/update-prices-list", ["GERENTE"], getUpdatePricesListPage);
    this.get("/list-products", ["MOSTRADOR", "GERENTE"], getListProductsPage);
    this.get("/", ["GERENTE"], getHomePage);
  }
}
