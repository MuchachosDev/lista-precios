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
  getByFactorId = async (fid) => {
    try {
      return await productModel.findOne({ factor: fid });
    } catch (error) {
      console.log(error);
    }
  };
  getByCode = async (code) => {
    try {
      return await productModel.findOne({ code: code }).populate("factor");
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
  getWithParams = async (filter, page, limit, sort, brand) => {
    try {
      const words = filter.replace(".", "\\.").split(" ");
      const conditions = words.map((word) => {
        const regex = new RegExp(word, "i");
        return {
          $or: [{ code: regex }, { description: regex }, { brand: regex }],
        };
      });

      const aggregationPipeline = [
        {
          $match: {
            $and: conditions,
          },
        },
        {
          $lookup: {
            from: "factors",
            localField: "factor",
            foreignField: "_id",
            as: "factorData",
          },
        },
        {
          $unwind: {
            path: "$factorData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "suppliers",
            localField: "factorData.supplier",
            foreignField: "_id",
            as: "supplierData",
          },
        },
        {
          $unwind: {
            path: "$supplierData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "dollars",
            localField: "currency.cotization",
            foreignField: "_id",
            as: "dollarData",
          },
        },
        {
          $unwind: {
            path: "$dollarData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            filtered_price: {
              $let: {
                vars: {
                  priceItem: {
                    $first: {
                      $filter: {
                        input: "$list_price",
                        as: "item",
                        cond: "$$item.status",
                      },
                    },
                  },
                },
                in: "$$priceItem.price",
              },
            },
          },
        },
        {
          $project: {
            code: 1,
            description: 1,
            brand: 1,
            factor: 1,
            list_price: {
              $cond: {
                if: { $eq: ["$currency.code", "USD"] },
                then: {
                  $multiply: [
                    { $ifNull: ["$filtered_price", 0] },
                    { $ifNull: ["$dollarData.value", 1] },
                  ],
                },
                else: { $ifNull: ["$filtered_price", 0] },
              },
            },
            final_price: {
              $cond: {
                if: { $eq: ["$currency.code", "USD"] },
                then: {
                  $multiply: [
                    { $ifNull: ["$filtered_price", 0] },
                    { $ifNull: ["$factorData.value", 1] },
                    { $ifNull: ["$dollarData.value", 1] },
                    { $add: [1, { $divide: ["$iva", 100] }] },
                  ],
                },
                else: {
                  $multiply: [
                    { $ifNull: ["$filtered_price", 0] },
                    { $ifNull: ["$factorData.value", 1] },
                    { $add: [1, { $divide: ["$iva", 100] }] },
                  ],
                },
              },
            },
            currency: 1,
            iva: 1,
            tag_file: 1,
            created_at: 1,
            updated_at: 1,
            supplier: "$supplierData.name",
          },
        },
      ];
      if (brand) {
        aggregationPipeline.push({
          $match: { brand },
        });
      }
      const totalResults = await productModel.aggregate(aggregationPipeline);

      if (sort) {
        aggregationPipeline.push({ $sort: { final_price: sort } });
      }
      aggregationPipeline.push(
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      );
      return {
        docs: await productModel.aggregate(aggregationPipeline),
        totalDocs: totalResults.length,
        hasNextPage: (await productModel.countDocuments()) > page * limit,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        totalPages: Math.ceil((await productModel.countDocuments()) / limit),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  update = async (pid, product) => {
    try {
      return await productModel.findByIdAndUpdate(
        { _id: pid },
        { ...product, updated_at: new Date() },
      );
    } catch (error) {
      console.log(error);
    }
  };

  getBrands = async () => {
    try {
      return await productModel.distinct("brand");
    } catch (error) {
      console.log(error);
    }
  };
  getProduct = async (code, brand, factor) => {
    try {
      return await productModel.findOne({
        code,
        brand,
        factor,
      });
    } catch (error) {
      console.log(error);
    }
  };
  downPrices = async (pid) => {
    try {
      return await productModel.findOneAndUpdate(
        { pid },
        { $set: { "list_price.$[].status": false } },
      );
    } catch (error) {
      console.log(error);
    }
  };
}
