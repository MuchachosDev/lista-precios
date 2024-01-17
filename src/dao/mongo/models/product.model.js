import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

const productSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
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
    type: String,
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

productSchema.pre("findOne", function () {
  this.populate("factor");
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

productSchema.plugin(mongoosePaginate);

export const productModel = model(productCollection, productSchema);
