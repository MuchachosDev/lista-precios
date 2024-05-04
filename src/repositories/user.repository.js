export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = async () => {
    try {
      return this.dao.getUsers();
    } catch (error) {
      return error;
    }
  };
  getUserByUsername = async (username) => {
    try {
      return this.dao.getByUsername(username);
    } catch (error) {
      return error;
    }
  };
  addUser = async (user) => {
    try {
      return this.dao.add(user);
    } catch (error) {
      return error;
    }
  };
}
