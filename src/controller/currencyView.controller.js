import CurrencyDTO from '../dto/currency.dto.js';
import { currencyService } from '../repositories/index.repository.js';

export const manageCurrencysPage = async (req, res) => {
  try {
    const response = await currencyService.getCurrencys();
    const currencysDTO = CurrencyDTO.getCurrencysToPage(response);
    return res.render('manageCurrencys', {
      title: 'Manage Currency',
      currencys: currencysDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editCurrencyPage = async (req, res) => {
  try {
    const { did } = req.params;
    const response = await currencyService.getCurrencyById(did);
    const currencyDTO = CurrencyDTO.getCurrencyToPage(response);
    return res.render('editCurrency', {
      title: 'EDITAR MONEDA',
      currency: currencyDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
