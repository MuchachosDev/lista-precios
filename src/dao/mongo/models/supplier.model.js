import { Schema, model } from 'mongoose';

const supplierCollection = 'suppliers';

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  currency: {
    type: Schema.Types.ObjectId || null,
    ref: 'currencys',
  },
});

supplierSchema.pre('find', function () {
  this.populate('currency');
});

export const supplierModel = model(supplierCollection, supplierSchema);
