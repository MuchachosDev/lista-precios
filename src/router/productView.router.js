import {
  getCodebarsPrintPage,
  getEditProductPage,
  getGenerateCodebarsPage,
  getHomePage,
  getListProductsPage,
  getUpdatePricesListPage,
  getUploadDocumentPage,
} from '../controller/productView.controller.js';
import RouterBase from './index.js';

export default class ProductViewRouter extends RouterBase {
  init() {
    this.get('/upload-document', ['MANAGER'], getUploadDocumentPage);
    this.get('/update-prices-list', ['MANAGER'], getUpdatePricesListPage);
    this.get('/list-products', ['READ_ONLY', 'MANAGER'], getListProductsPage);
    this.get('/', ['MANAGER'], getHomePage);
    this.get('/generate-codebars', ['MANAGER'], getGenerateCodebarsPage);
    this.get('/codebars-print', ['MANAGER'], getCodebarsPrintPage);
    this.get('/edit-product/:pid', ['MANAGER'], getEditProductPage);
  }
}
