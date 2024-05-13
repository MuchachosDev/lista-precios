import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['MANAGER', 'READ_ONLY'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

export const userModel = model(userCollection, userSchema);
