export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addProduct = async (product) => {
    try {
      return await this.dao.add(product);
    } catch (error) {
      return error;
    }
  };
  getAllProducts = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      return error;
    }
  };
  getProductsWithParams = async (filter, page, limit) => {
    try {
      return await this.dao.getWithParams(filter, page, limit);
    } catch (error) {
      return error;
    }
  };
  getProductByCode = async (code) => {
    try {
      return await this.dao.getByCode(code);
    } catch (error) {
      return error;
    }
  };
  updatePriceToProduct = async (code, price) => {
    try {
      return await this.dao.updatePrice(code, price);
    } catch (error) {
      return error;
    }
  };
}
