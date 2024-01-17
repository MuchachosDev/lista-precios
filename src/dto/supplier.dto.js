export default class SupplierDTO {
  constructor(name) {
    this.name = name.toUpperCase() || "Unknown";
  }
  static getSuppliersToPage = (supplier) => {
    return {
      _id: supplier._id,
      name: supplier.name,
    };
  };
}
