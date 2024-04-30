import { dollarModel } from "../models/dollar.model.js";

export default class Dollar {
  add = async (dollar) => {
    try {
      return await dollarModel.create(dollar);
    } catch (error) {
      return error;
    }
  };
  getById = async (did) => {
    try {
      return await dollarModel.findById(did);
    } catch (error) {
      return error;
    }
  };
  get = async () => {
    try {
      return await dollarModel.find();
    } catch (error) {
      return error;
    }
  };
  update = async (did, dollar) => {
    try {
      return await dollarModel.findByIdAndUpdate(did, {
        ...dollar,
        updated_at: Date.now(),
      });
    } catch (error) {
      return error;
    }
  };
}
