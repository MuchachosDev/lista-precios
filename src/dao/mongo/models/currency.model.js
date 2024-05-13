import { Schema, model } from 'mongoose';

const currencyCollection = 'currencys';

const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    default: 1000,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

export const currencyModel = model(currencyCollection, currencySchema);
