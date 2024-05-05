import { Schema, model } from 'mongoose';
import envConfig from '../../../config/env.config.js';

const counterCollection = 'counter';

const counterSchema = new Schema({
  internal_id: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
    default: 1,
  },
});

counterSchema.pre('save', function () {
  this.internal_id = `${envConfig.PREFIX_DATABASE_ID}-${this.seq.toString().padStart(9, '0')}`;
});

counterSchema.post('findOneAndUpdate', async function () {
  const updatedDoc = await this.model.findOne(this.getQuery());
  if (updatedDoc) {
    await updatedDoc.save();
  }
});

export const counterModel = model(counterCollection, counterSchema);
