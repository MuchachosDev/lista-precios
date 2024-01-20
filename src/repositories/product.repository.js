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
  getProductByFactorId = async (fid) => {
    try {
      return await this.dao.getByFactorId(fid);
    } catch (error) {
      return error;
    }
  };
  getProductsWithParams = async (filter, page, limit, sort, brand) => {
    try {
      return await this.dao.getWithParams(filter, page, limit, sort, brand);
    } catch (error) {
      return error;
    }
  };
  getExactProduct = async (code, brand, factor) => {
    try {
      return await this.dao.getProduct(code, brand, factor);
    } catch (error) {
      return error;
    }
  };
  updateProduct = async (pid, product) => {
    try {
      return await this.dao.update(pid, product);
    } catch (error) {
      return error;
    }
  };
  getDistinticBrands = async () => {
    try {
      return await this.dao.getBrands();
    } catch (error) {
      return error;
    }
  };
  downPricesToProduct = async (pid) => {
    try {
      return await this.dao.downPrices(pid);
    } catch (error) {
      return error;
    }
  };
}
