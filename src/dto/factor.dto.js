export default class FactorDTO {
  constructor(value, supplier) {
    this.value = value;
    this.supplier = supplier || null;
  }
  static getFactorToPage = (factor) => {
    return {
      _id: factor._id,
      value: factor.value,
      supplier: factor.supplier.name,
    };
  };
}
