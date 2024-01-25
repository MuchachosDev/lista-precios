import { supplierModel } from "../models/supplier.model.js";

export default class Supplier {
  add = async (supplier) => {
    try {
      return await supplierModel.create(supplier);
    } catch (error) {
      return { error };
    }
  };
  getByName = async (name) => {
    try {
      return await supplierModel.findOne({ name });
    } catch (error) {
      return { error };
    }
  };
  getById = async (sid) => {
    try {
      return await supplierModel.findById(sid);
    } catch (error) {
      return { error };
    }
  };

  get = async () => {
    try {
      return await supplierModel.find().sort({updated_at: -1});
    } catch (error) {
      return { error };
    }
  };
  put = async (supplier, sid) => {
    try {
      return await supplierModel.updateOne(
        { _id: sid },
        { ...supplier, updated_at: Date.now() },
      );
    } catch (error) {
      return { error };
    }
  };
  delete = async (sid) => {
    try {
      return await supplierModel.deleteOne({ _id: sid });
    } catch (error) {
      return { error };
    }
  };
}
