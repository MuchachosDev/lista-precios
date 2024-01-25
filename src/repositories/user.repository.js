export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUserByUsername = async (username) => {
    try {
      return this.dao.getByUsername(username);
    } catch (error) {
      return error;
    }
  };
}
