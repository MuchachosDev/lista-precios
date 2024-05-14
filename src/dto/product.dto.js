import { parseTextToIva, parseTextToNumber } from '../util/parser.util.js';

export default class ProductDTO {
  constructor(product) {
    this.bar_code = product.bar_code || '----';
    this.sku = product.sku.toUpperCase() || '----';
    this.model = product.model.toUpperCase() || '----';
    this.description = product.description.toUpperCase() || '----';
    this.brand = product.brand.toUpperCase() || '----';
    this.item = product.item.toUpperCase() || '----';
    this.sub_item = product.sub_item.toUpperCase() || '----';
    this.presentation = product.presentation.toUpperCase() || '----';
    this.iva = parseTextToIva(product.iva) || 0.21;
    this.price_list = parseTextToNumber(product.price_list) || 0;
    this.created_at = product.created_at || new Date();
    this.updated_at = product.updated_at || new Date();
  }
  static getProductToListView = (product) => {
    return {
      _id: product._id.toString(),
      internal_id: product.internal_id,
      model: product.model,
      description: product.description,
      brand: product.brand,
      supplier: product.supplier,
      item: product.item,
      sub_item: product.sub_item,
      presentation: product.presentation,
      iva: product.iva * 100 + '%',
      final_price: product.final_price.toFixed(2),
    };
  };
  static getProductToEditPage = (product) => {
    return {
      _id: product._id.toString(),
      internal_id: product.internal_id,
      model: product.model,
      description: product.description,
      brand: product.brand,
      supplier: product.supplier,
      item: product.item,
      sub_item: product.sub_item,
      presentation: product.presentation,
      iva: product.iva * 100,
      price_list: product.price_list.toFixed(2),
      final_price: product.final_price.toFixed(2),
      bar_code: product.bar_code,
      sku: product.sku,
    };
  };

  static getItemToProduct = (item) => {
    return {
      item: item,
    };
  };
  static getSubItemToProduct = (sub_item) => {
    return {
      sub_item: sub_item,
    };
  };

  static getBarcodesToPrint = (product) => {
    return {
      description: product.description,
      bar_code: product.bar_code,
    };
  };
}
