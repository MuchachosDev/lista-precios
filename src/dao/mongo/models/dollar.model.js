import { Schema, model } from 'mongoose';

const dollarCollection = 'dollars';

const dollarSchema = new Schema({
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
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

export const dollarModel = model(dollarCollection, dollarSchema);
