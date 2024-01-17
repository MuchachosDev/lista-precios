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
  getFactorById = async (fid) => {
    try {
      return await this.dao.getById(fid);
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
}
