import { Schema, model } from "mongoose";

const supplierCollection = "suppliers";

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

export const supplierModel = model(supplierCollection, supplierSchema);
