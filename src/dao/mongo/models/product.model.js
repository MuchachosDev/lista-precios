import { Schema, model } from 'mongoose';
import envConfig from '../../../config/env.config.js';
import { counterModel } from './counter.model.js';

const productCollection = 'products';

const productSchema = new Schema({
  internal_id: {
    type: String,
    index: { unique: true },
  },
  bar_code: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  sub_item: {
    type: String,
    required: true,
  },
  presentation: {
    type: String,
    required: true,
  },
  iva: {
    type: Number,
    required: true,
  },
  price_list: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  factor: {
    type: Schema.Types.ObjectId,
    ref: 'factors',
    required: true,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'suppliers',
    required: true,
  },
});

productSchema.pre('find', function () {
  this.populate('factor');
  this.populate('supplier');
});

productSchema.pre('aggregate', function () {
  this.lookup({
    from: 'factors',
    localField: 'factor',
    foreignField: '_id',
    as: 'factor',
  });
  this.unwind('factor');
});

productSchema.pre('save', async function (next) {
  const doc = this;
  try {
    if (this.isNew) {
      const counter = await counterModel.findOneAndUpdate(
        {},
        { $inc: { seq: 1 } },
        { new: true }
      );
      doc.internal_id = counter.internal_id;
    }
    next();
  } catch (error) {
    next(error);
  }
});
export const productModel = model(productCollection, productSchema);
