import { Schema, model } from "mongoose";

const productCollection = "products";

const list_price_item = new Schema({
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const currencyItem = new Schema({
  code: {
    type: String,
    required: true,
    enum: ["ARS", "USD"],
    default: "ARS",
  },
  cotization: {
    type: Schema.Types.ObjectId || null,
    ref: "dollars",
    default: null,
  },
});

const productSchema = new Schema({
  code: {
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
  factor: {
    type: Schema.Types.ObjectId,
    ref: "factors",
    required: true,
  },
  list_price: {
    type: [list_price_item],
    required: true,
  },

  currency: {
    type: currencyItem,
    required: true,
  },
  iva: {
    type: Number,
    required: true,
  },
  tag_file: {
    type: String,
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

export const productModel = model(productCollection, productSchema);
