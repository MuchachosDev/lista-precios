import { Schema, model } from 'mongoose';

const factorCollection = 'factors';

const factorSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: 'General',
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'suppliers',
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

factorSchema.pre('findOne', function () {
  this.populate('supplier');
});

factorSchema.pre('find', function () {
  this.populate('supplier');
});

export const factorModel = model(factorCollection, factorSchema);
