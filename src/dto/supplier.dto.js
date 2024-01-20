export default class SupplierDTO {
  constructor(name) {
    this.name = name.toUpperCase().trim() || "Unknown";
  }
  static getSuppliersToPage = (supplier) => {
    return {
      _id: supplier._id,
      name: supplier.name,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at,
    };
  };
}
