import { userModel } from '../models/user.model.js';

export default class User {
  getByUsername = async (username) => {
    try {
      return userModel.findOne({ username: username });
    } catch (error) {
      return error;
    }
  };
}
