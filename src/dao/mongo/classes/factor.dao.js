import { factorModel } from "../models/factor.model.js";

export default class Factor {
  add = async (factor) => {
    try {
      return factorModel.create(factor);
    } catch (error) {
      return error;
    }
  };
  getById = async (fid) => {
    try {
      return await factorModel.findOne({ _id: fid });
    } catch (error) {
      return error;
    }
  };
  get = async () => {
    try {
      return await factorModel.find();
    } catch (error) {
      return error;
    }
  };
}
