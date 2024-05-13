import { currencyService } from '../repositories/index.repository.js';

export const changeCurrency = async (req, res) => {
  try {
    const { did } = req.params;
    const { value, name } = req.body;

    const currency = await currencyService.updateCurrency(did, { value, name });

    if (!currency) {
      return res.sendClientError({ message: 'Currency cannot be edited' });
    }
    return res.sendSuccess({ message: 'Currency edited' });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
