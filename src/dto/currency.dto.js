export default class CurrencyDTO {
  constructor(currency) {
    this.name = currency.name.toUpperCase() || 'UNKNOWN';
    this.value = currency.value || 0;
    this.created_at = currency.created_at || new Date();
    this.updated_at = currency.updated_at || new Date();
  }

  static getCurrencyToPage = (currency) => {
    return {
      name: currency.name,
      value: currency.value,
      created_at: currency.created_at,
      updated_at: currency.updated_at,
      _id: currency._id.toString(),
    };
  };
  static getCurrencysToPage = (currencys) => {
    return currencys.map((currency) => {
      return {
        name: currency.name,
        value: currency.value,
        created_at: currency.created_at,
        updated_at: currency.updated_at,
        _id: currency._id.toString(),
      };
    });
  };
}
