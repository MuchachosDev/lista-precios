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
  getBySupplier = async (sid) => {
    try {
      return await factorModel.find({ supplier: sid });
    } catch (error) {
      return error;
    }
  };
  get = async () => {
    try {
      return await factorModel.find().sort({ updated_at: -1 });
    } catch (error) {
      return error;
    }
  };
  put = async (fid, factor) => {
    try {
      return await factorModel.updateOne(
        { _id: fid },
        { ...factor, updated_at: Date.now() },
      );
    } catch (error) {
      return error;
    }
  };
  delete = async (fid) => {
    try {
      return await factorModel.deleteOne({ _id: fid });
    } catch (error) {
      return error;
    }
  };
}
