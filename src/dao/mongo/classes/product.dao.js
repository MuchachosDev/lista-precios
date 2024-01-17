import { productModel } from "../models/product.model.js";

export default class Product {
  add = async (product) => {
    try {
      const createdProducts = await productModel.create(product);
      return createdProducts;
    } catch (error) {
      console.log(error);
    }
  };
  getByCode = async (code) => {
    try {
      return await productModel.findOne({ code: code });
    } catch (error) {
      console.log(error);
    }
  };
  getAll = async () => {
    try {
      return await productModel.find();
    } catch (error) {
      return error;
    }
  };
  getWithParams = async (filter, page, limit) => {
    try {
      const words = filter.split(" ");
      const conditions = words.map((word) => {
        const regex = new RegExp(word, "i");
        return {
          $or: [{ code: regex }, { description: regex }, { brand: regex }],
        };
      });
      const options = {
        page: page || 1,
        limit: limit || 12,
        projection: {
          code: 1,
          description: 1,
          brand: 1,
          factor: 1,
          list_price: {
            $filter: {
              input: "$list_price",
              as: "priceItem",
              cond: { $eq: ["$$priceItem.status", true] },
            },
          },
          currency: 1,
          iva: 1,
          tag_file: 1,
          created_at: 1,
          updated_at: 1,
        },
      };
      return await productModel.paginate(
        {
          $and: conditions,
        },
        options,
      );
    } catch (error) {
      console.log(error);
    }
  };
  updatePrice = async (code, price) => {
    try {
      const response = await productModel.updateOne(
        { code },
        { $set: { "list_price.$[].status": false } },
      );

      if (!response) {
        return false;
      }

      return await productModel.updateOne(
        { code },
        { $push: { list_price: price }, $set: { updated_at: new Date() } },
      );
    } catch (error) {
      console.log(error);
    }
  };
}
