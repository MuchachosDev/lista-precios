import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config.js';
export default class UserDTO {
  constructor(user) {
    this.username = user.username || 'user';
    this.role = user.role || 'user';
    this.password = user.password || 'password';
    this.createdAt = user.createdAt || Date.now();
  }

  getUserForToken = () => {
    const { username, role } = this;
    return { username, role };
  };

  getJwtToken = () => {
    return jwt.sign(this.getUserForToken(), envConfig.JWT_SECRET, {
      expiresIn: envConfig.JWT_EXPIRES_IN,
    });
  };
  static verifyJwtToken = (token) => {
    return jwt.verify(token, envConfig.JWT_SECRET);
  };
}
