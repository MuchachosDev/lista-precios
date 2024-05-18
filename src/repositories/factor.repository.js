export default class FactorRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addFactor = async (factor) => {
    try {
      return this.dao.add(factor);
    } catch (error) {
      return error;
    }
  };
  getFactorByName = async (name) => {
    try {
      return await this.dao.getByName(name);
    } catch (error) {
      return error;
    }
  };
  getFactorById = async (fid) => {
    try {
      return await this.dao.getById(fid);
    } catch (error) {
      return error;
    }
  };
  getFactorsBySupplier = async (sid) => {
    try {
      return await this.dao.getBySupplier(sid);
    } catch (error) {
      return error;
    }
  };
  getAllFactors = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  updateFactor = async (fid, factor) => {
    try {
      return await this.dao.put(fid, factor);
    } catch (error) {
      return error;
    }
  };
  deleteFactor = async (fid) => {
    try {
      return await this.dao.delete(fid);
    } catch (error) {
      return error;
    }
  };
}
