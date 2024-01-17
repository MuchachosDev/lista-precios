export default class ProductDTO {
  constructor(
    code,
    description,
    brand,
    factor,
    list_price,
    currency,
    iva,
    tag_file,
  ) {
    this.code = code.trim() ?? "";
    this.description = description.trim() || "";
    this.brand = brand.toUpperCase().trim() || "";
    this.factor = factor || null;
    this.list_price = Array.isArray(list_price)
      ? list_price
      : [this.generatePriceToProduct(list_price)];
    this.currency = currency.trim() || "ARS";
    this.iva = this.parseableNumberFixed(iva) || 21;
    this.tag_file = tag_file.trim() || "";
  }

  parseableNumberFixed(string) {
    return parseFloat(string.replace(".", "").replace(",", "."));
  }
  static getProductToListView = (product) => {
    const { price } = product.list_price[0];
    return {
      code: product.code || "",
      description: product.description || "",
      brand: product.brand || "",
      list_price: Number(price.toFixed(2)) || 0,
      currency: product.currency || "ARS",
      iva: product.iva || 21,
      final_price:
        Number(price * (1 + product.iva / 100) * product.factor.value).toFixed(
          2,
        ) || 0,
    };
  };
  generatePriceToProduct = (list_price) => {
    return {
      price: this.parseableNumberFixed(list_price) || 0,
      created_at: new Date(),
      status: true,
    };
  };
}
