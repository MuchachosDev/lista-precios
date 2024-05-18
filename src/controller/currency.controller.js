import CurrencyDTO from '../dto/currency.dto.js';
import { currencyService } from '../repositories/index.repository.js';

export const changeCurrency = async (req, res) => {
  const { did } = req.params;
  const { value, name } = req.body;
  try {
    const existCurrency = await currencyService.getCurrencys();
    if (
      existCurrency.some(
        (currency) => currency.name === name && currency._id.toString() !== did
      )
    ) {
      return res.sendClientError({
        message: 'Exist a currency with that name',
    });
  }
    const currency = await currencyService.updateCurrency(did, { value, name });

    if (!currency) {
      return res.sendClientError({ message: 'Currency not updated'});
    }
    return res.sendSuccess({ message: 'Currency updated successfully'});
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const addCurrency = async (req, res) => {
  try {
    const { value, name } = req.body;

    const existingCurrency = await currencyService.getCurrencys();
    if (existingCurrency.some((currency) => currency.name === name)) {
      return res.sendClientError({
        message: 'Exist a currency with that name',
      });
    }
    const currency = await currencyService.addCurrency(
      new CurrencyDTO({ value, name })
    );

    if (!currency) {
      return res.sendClientError({ message: 'Currency not created' });
    }
    return res.sendSuccess({ message: 'Currency created successfully' });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
