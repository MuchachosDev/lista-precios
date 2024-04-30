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
  getDollars = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  updateDollar = async (did, dollar) => {
    try {
      return await this.dao.update(did, dollar);
    } catch (error) {
      return error;
    }
  };
}
