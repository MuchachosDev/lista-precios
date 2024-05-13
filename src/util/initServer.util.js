import envConfig from '../config/env.config.js';
import { counterModel } from '../dao/mongo/models/counter.model.js';
import { productModel } from '../dao/mongo/models/product.model.js';
import CurrencyDTO from '../dto/currency.dto.js';
import {
  currencyService,
  userService,
} from '../repositories/index.repository.js';
import { createHash } from './crypto.util.js';

export const defaultCurrency = async () => {
  try {
    const currencys = await currencyService.getCurrencys();
    if (currencys.length === 0) {
      const newCurrency = await currencyService.addCurrency(
        new CurrencyDTO({ name: envConfig.DEFAULT_CURRENCY_NAME, value: envConfig.DEFAULT_CURRENCY })
      );
      if (!newCurrency) {
        console.log('Currency not created');
      }
      console.log("Currency created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async () => {
  try {
    const response = await userService.getUsers();
    if (response.length === 0) {
      const newManager = await userService.addUser({
        username: `${envConfig.MANAGER_USERNAME}`,
        password: createHash(envConfig.MANAGER_PASSWORD),
        role: 'MANAGER',
      });
      if (!newManager) {
        console.log('Manager not created');
      } else {
        console.log('Manager created');
      }
      const newReadOnly = await userService.addUser({
        username: `${envConfig.READ_ONLY_USERNAME}`,
        password: createHash(envConfig.READ_ONLY_PASSWORD),
        role: 'READ_ONLY',
      });
      if (!newReadOnly) {
        console.log('Read only not created');
      } else {
        console.log('Read only created');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createIndexes = async () => {
  try {
    await productModel.createIndexes();
    const counters = await counterModel.find();
    if (counters.length === 0) {
      await counterModel.create({ seq: 1 });
      console.log('Counter created');
    }
  } catch (error) {
    console.log(error);
  }
};
