import DollarDTO from '../dto/dollar.dto.js';
import { dollarService } from '../repositories/index.repository.js';

export const manageDollarsPage = async (req, res) => {
  try {
    const response = await dollarService.getDollars();
    const dollarsDTO = DollarDTO.getDollarsToPage(response);
    return res.render('manageDollars', {
      title: 'Manage Dollar',
      dollars: dollarsDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editDollarPage = async (req, res) => {
  try {
    const { did } = req.params;
    const response = await dollarService.getDollarById(did);
    const dollarDTO = DollarDTO.getDollarToPage(response);
    return res.render('editDollar', {
      title: 'Edit Dollar',
      dollar: dollarDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
