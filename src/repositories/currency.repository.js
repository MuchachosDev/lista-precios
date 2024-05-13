export default class CurrencyRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addCurrency = async (currency) => {
    try {
      return await this.dao.add(currency);
    } catch (error) {
      return error;
    }
  };
  getCurrencyById = async (did) => {
    try {
      return await this.dao.getById(did);
    } catch (error) {
      return error;
    }
  };
  getCurrencys = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  updateCurrency = async (did, currency) => {
    try {
      return await this.dao.update(did, currency);
    } catch (error) {
      return error;
    }
  };
}
