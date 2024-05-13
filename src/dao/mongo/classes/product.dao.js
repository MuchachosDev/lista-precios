import { productModel } from '../models/product.model.js';

export default class Product {
  add = async (product) => {
    try {
      const createdProducts = await productModel.create(product);
      return createdProducts;
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (pid) => {
    try {
      return await productModel.findOne({ _id: pid });
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
      return await productModel.findOne({ code: code }).populate('factor');
    } catch (error) {
      console.log(error);
    }
  };
  getBySupplier = async (sid) => {
    try {
      return await productModel.find({ supplier: sid });
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
  getWithPagination = async (filter, page, limit, sort, brand) => {
    try {
      const words = filter.replace('.', '\\.').split(' ');
      const conditions = words.map((word) => {
        const regex = new RegExp(word, 'i');
        return {
          $or: [
            { internal_id: regex },
            { bar_code: regex },
            { model: regex },
            { description: regex },
            { brand: regex },
            {sku: regex},
          ],
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
            from: 'factors',
            localField: 'factor',
            foreignField: '_id',
            as: 'factorData',
          },
        },
        {
          $unwind: {
            path: '$factorData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'supplier',
            foreignField: '_id',
            as: 'supplierData',
          },
        },
        {
          $unwind: {
            path: '$supplierData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'currencys',
            localField: 'supplierData.currency',
            foreignField: '_id',
            as: 'currencysData',
          },
        },
        {
          $unwind: {
            path: '$currencysData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            internal_id: 1,
            model: 1,
            description: 1,
            brand: 1,
            factor: 1,
            final_price: {
              $multiply: [
                { $ifNull: ['$price_list', 0] },
                { $ifNull: ['$factorData.value', 1] },
                { $ifNull: ['$currencysData.value', 1] },
                { $add: [1, { $ifNull: ['$iva', 0] }] },
              ],
            },
            iva: 1,
            supplier: '$supplierData.name',
            item: 1,
            sub_item: 1,
            presentation: 1,
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
        }
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
        { ...product, updated_at: new Date() }
      );
    } catch (error) {
      console.log(error);
    }
  };

  getBrands = async () => {
    try {
      return await productModel.distinct('brand');
    } catch (error) {
      console.log(error);
    }
  };

  getItems = async (sid = null) => {
    try {
      if (sid) {
        return await productModel.distinct('item', { supplier: sid });
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };

  getSubItems = async (sid, item = null) => {
    try {
      if (item) {
        return await productModel.distinct('sub_item', { supplier: sid, item });
      }
      return await productModel.distinct('sub_item', { supplier: sid });
    } catch (error) {
      console.log(error);
    }
  };
  updatePrice = async (sid, item, sub_item, percentage, adjustment_type) => {
    try {
      const mul =
        adjustment_type === 'increase'
          ? {
              $mul: { price_list: 1 + percentage / 100 },
              update_at: new Date(),
            }
          : {
              $mul: { price_list: 1 - percentage / 100 },
              update_at: new Date(),
            };

      if (
        sid === 'all-suppliers' &&
        item === 'all-items' &&
        sub_item === 'all-sub-items'
      ) {
        return await productModel.updateMany({}, mul);
      } else if (item === 'all-items' && sub_item === 'all-sub-items') {
        return await productModel.updateMany({ supplier: sid }, mul);
      } else if (sub_item === 'all-sub-items' && item !== 'all-items') {
        return await productModel.updateMany({ supplier: sid, item }, mul);
      } else {
        return await productModel.updateMany(
          { supplier: sid, item, sub_item },
          mul
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  getWithFilter = async (filter) => {
    try {
      return await productModel.find(filter);
    } catch (error) {
      console.log(error);
    }
  };
}
