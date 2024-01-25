export default class ProductDTO {
  constructor(product) {
    this.code = product.code ?? "";
    this.description = product.description || "";
    this.brand = product.brand || "";
    this.factor = product.factor || null;
    this.list_price = Array.isArray(product.list_price)
      ? product.list_price
      : [this.generatePriceToProduct(product.list_price)];
    this.currency = product.currency.code
      ? product.currency
      : this.structureCurrency(product.currency, product.dollar);
    this.iva = product.iva || 21;
    this.tag_file = product.tag_file || "";
  }
  static getProductToListView = (product) => {
    return {
      code: product.code || "WITHOUT CODE",
      description: product.description || "WITHOUT DESCRIPTION",
      brand: product.brand || "WITHOUT BRAND",
      list_price: product.list_price.toFixed(2) || 0,
      supplier: product.supplier,
      currency: product.currency,
      iva: product.iva || 21,
      final_price: product.final_price.toFixed(2) || 0,
    };
  };
  generatePriceToProduct = (list_price) => {
    return {
      price: list_price || 0,
      created_at: new Date(),
      status: true,
    };
  };
  structureCurrency = (currency, dollar) => {
    return {
      code: currency,
      cotization: currency === "ARS" ? null : dollar._id,
    };
  };
  equals = (product) => {
    return {
      code: this.code === product.code,
      description: this.description === product.description,
      iva: this.iva === product.iva,
      currency: this.currency.code === product.currency.code,
      list_price:
        this.list_price[0].price ===
        product.list_price.find((price) => price.status).price,
    };
  };
}
