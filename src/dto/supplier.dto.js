export default class SupplierDTO {
  constructor(name, currency) {
    this.name = name.toUpperCase() || 'UNKNOWN';
    this.currency = currency;
    this.created_at = this.created_at || new Date();
    this.updated_at = this.updated_at || new Date();
  }
  static getSuppliersToPage = (supplier) => {
    return {
      _id: supplier._id.toString(),
      name: supplier.name,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at,
      currency: supplier.currency ? supplier.currency.name : 'PESO',
    };
  };
}
