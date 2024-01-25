export default class SupplierDTO {
  constructor(name) {
    this.name = name || "UNKNOWN";
  }
  static getSuppliersToPage = (supplier) => {
    return {
      _id: supplier._id.toString(),
      name: supplier.name,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at,
    };
  };
}
