import { Schema, model } from "mongoose";
import envConfig from "../../../config/env.config.js";

const productCollection = "products";

const productSchema = new Schema({
  ingelec_id: {
    type: String,
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
    ref: "factors",
    required: true,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "suppliers",
    required: true,
  },
});

productSchema.pre("find", function () {
  this.populate("factor");
});

productSchema.pre("aggregate", function () {
  this.lookup({
    from: "factors",
    localField: "factor",
    foreignField: "_id",
    as: "factor",
  });
  this.unwind("factor");
});

productSchema.pre("save", async function (next) {
  const doc = this;
  const prefix = envConfig.PREFIX_DATABASE_ID;
  try {
    const counter = await productModel.countDocuments();
    doc.ingelec_id = `${prefix}-${(counter + 1).toString().padStart(9, "0")}`;
    next();
  } catch (error) {
    next(error);
  }
});
export const productModel = model(productCollection, productSchema);
