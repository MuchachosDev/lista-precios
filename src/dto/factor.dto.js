export default class FactorDTO {
  constructor(value, supplier, name) {
    this.value = value;
    this.supplier = supplier;
    this.name = name || "GENERAL";
  }
  static getFactorToPage = (factor) => {
    return {
      _id: factor._id,
      value: factor.value,
      supplier: factor.supplier.name,
      supplier_id: factor.supplier._id,
      name: factor.name,
      created_at: factor.created_at || Date.now(),
      updated_at: factor.updated_at || Date.now(),
    };
  };
}
