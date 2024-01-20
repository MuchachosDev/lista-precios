import { Schema, model } from "mongoose";

const dollarCollection = "dollars";

const dollarSchema = new Schema({
  value: {
    type: Number,
    required: true,
    default: 1000,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const dollarModel = model(dollarCollection, dollarSchema);
