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
  getProductsBySupplier = async (sid) => {
    try {
      return await this.dao.getBySupplier(sid);
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

  getDistinctItems = async (sid) => {
    try {
      return await this.dao.getItems(sid);
    } catch (error) {
      return error;
    }
  };

  getDistinctSubItems = async (item) => {
    try {
      return await this.dao.getSubItems(item);
    } catch (error) {
      return error;
    }
  };

  updatePriceList = async (
    sid,
    item,
    sub_item,
    percentage,
    adjustment_type
  ) => {
    try {
      return await this.dao.updatePrice(
        sid,
        item,
        sub_item,
        percentage,
        adjustment_type
      );
    } catch (error) {
      return error;
    }
  };
}
