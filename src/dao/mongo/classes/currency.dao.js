import { currencyModel } from '../models/currency.model.js';

export default class Currency {
  add = async (currency) => {
    try {
      return await currencyModel.create(currency);
    } catch (error) {
      return error;
    }
  };
  getById = async (did) => {
    try {
      return await currencyModel.findById(did);
    } catch (error) {
      return error;
    }
  };
  get = async () => {
    try {
      return await currencyModel.find();
    } catch (error) {
      return error;
    }
  };
  update = async (did, currency) => {
    try {
      return await currencyModel.findByIdAndUpdate(did, {
        ...currency,
        updated_at: new Date(),
      });
    } catch (error) {
      return error;
    }
  };
}
