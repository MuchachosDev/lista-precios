export default class SupplierRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addSupplier = async (supplier) => {
    try {
      return await this.dao.add(supplier);
    } catch (error) {
      return { error };
    }
  };
  getSupplierByName = async (name) => {
    try {
      return await this.dao.getByName(name);
    } catch (error) {
      return { error };
    }
  };
  getSupplierById = async (sid) => {
    try {
      return await this.dao.getById(sid);
    } catch (error) {
      return { error };
    }
  };

  getAllSuppliers = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return { error };
    }
  };
}
