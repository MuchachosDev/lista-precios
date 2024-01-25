export default class FactorDTO {
  constructor(value, supplier, name, status) {
    this.value = value;
    this.supplier = supplier;
    this.name = name || "GENERAL";
    this.status = status || true;
  }
  static getFactorToPage = (factor) => {
    return {
      _id: factor._id,
      value: factor.value,
      supplier: factor.supplier.name,
      name: factor.name,
      created_at: factor.created_at || Date.now(),
      updated_at: factor.updated_at || Date.now(),
    };
  };
}
