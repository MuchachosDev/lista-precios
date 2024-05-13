export default class FactorDTO {
  constructor(value, supplier, name) {
    this.value = value;
    this.supplier = supplier;
    this.name = name.toUpperCase() || 'GENERAL';
    this.created_at = this.created_at || new Date();
    this.updated_at = this.updated_at|| new Date();
  }
  static getFactorToPage = (factor) => {
    return {
      _id: factor._id,
      value: factor.value,
      supplier: factor.supplier.name,
      supplier_id: factor.supplier._id.toString(),
      name: factor.name,
      created_at: factor.created_at || new Date(),
      updated_at: factor.updated_at || new Date(),
    };
  };
}
