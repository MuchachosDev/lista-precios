export default class DollarDTO {
  constructor(dollar) {
    this.value = dollar.value || 0;
    this.status = dollar.status || true;
  }

  static getDollarToPage = (dollar) => {
    return {
      value: dollar.value,
      status: dollar.status,
      created_at: dollar.created_at,
      _id: dollar._id,
    };
  };
}
