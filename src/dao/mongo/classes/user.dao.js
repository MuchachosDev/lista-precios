import { userModel } from '../models/user.model.js';

export default class User {
  getUsers = async () => {
    try {
      return userModel.find();
    } catch (error) {
      return error;
    }
  };
  getByUsername = async (username) => {
    try {
      return userModel.findOne({ username: username });
    } catch (error) {
      return error;
    }
  };
  add = async (user) => {
    try {
      return userModel.create(user);
    } catch (error) {
      return error;
    }
  };
}
