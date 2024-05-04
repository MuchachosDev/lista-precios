import envConfig from '../config/env.config.js';
import DollarDTO from '../dto/dollar.dto.js';
import { dollarService } from '../repositories/index.repository.js';

export const defaultDollar = async () => {
  try {
    const dollars = await dollarService.getDollars();
    if (dollars.length === 0) {
      const newDollar = await dollarService.addDollar(
        new DollarDTO({ name: 'Dólar blue', value: envConfig.DEFAULT_DOLLAR })
      );
      if (!newDollar) {
        console.log('Dollar not created');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
