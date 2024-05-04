import { Schema, model } from 'mongoose';
import envConfig from '../../../config/env.config.js';

const counterCollection = 'counter';

const counterSchema = new Schema({
  _id: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
    default: 1,
  },
});

counterSchema.pre('save', async function (next) {
  this._id = `${envConfig.PREFIX_DATABASE_ID}-${(this.seq).toString().padStart(9, '0')}`;
  next();
});
export const counterModel = model(counterCollection, counterSchema);
