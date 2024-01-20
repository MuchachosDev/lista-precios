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
      return await dollarModel.findOne({ status: true });
    } catch (error) {
      return error;
    }
  };
  disable = async (did) => {
    try {
      return await dollarModel.findByIdAndUpdate(did, { status: false });
    } catch (error) {
      return error;
    }
  };
}
