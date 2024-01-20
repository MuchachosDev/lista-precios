export default class DollarRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addDollar = async (dollar) => {
    try {
      return await this.dao.add(dollar);
    } catch (error) {
      return error;
    }
  };
  getDollarById = async (did) => {
    try {
      return await this.dao.getById(did);
    } catch (error) {
      return error;
    }
  };
  getDollar = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  disableDollar = async (did) => {
    try {
      return await this.dao.disable(did);
    } catch (error) {
      return error;
    }
  };
}
