export default class DollarDTO {
  constructor(dollar) {
    this.name = dollar.name || "UNKNOWN";
    this.value = dollar.value || 0;
  }

  static getDollarToPage = (dollar) => {
    return {
      name: dollar.name,
      value: dollar.value,
      created_at: dollar.created_at,
      updated_at: dollar.updated_at,
      _id: dollar._id,
    };
  };
  static getDollarsToPage = (dollars) => {
    return dollars.map((dollar) => {
      return {
        name: dollar.name,
        value: dollar.value,
        created_at: dollar.created_at,
        updated_at: dollar.updated_at,
        _id: dollar._id,
      };
    });
  };
}
