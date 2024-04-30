export default class SupplierDTO {
  constructor(name, dollar) {
    this.name = name || "UNKNOWN";
    this.dollar = dollar;
  }
  static getSuppliersToPage = (supplier) => {
    return {
      _id: supplier._id,
      name: supplier.name,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at,
      dollar: supplier.dollar ? supplier.dollar.name : "Peso",
    };
  };
}
