export default class ProductDTO {
  constructor(product) {
    this.bar_code = product.bar_code || '----';
    this.sku = product.sku || '----';
    this.model = product.model || '----';
    this.description = product.description || '----';
    this.brand = product.brand || '----';
    this.item = product.item || '----';
    this.sub_item = product.sub_item || '----';
    this.presentation = product.presentation || '----';
    this.iva = product.iva || 0.21;
    this.price_list = product.price_list || 0;
  }
  static getProductToListView = (product) => {
    return {
      ingelec_id: product.ingelec_id,
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
  generatePriceToProduct = (list_price) => {
    return {
      price: list_price || 0,
      created_at: new Date(),
      status: true,
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
}
