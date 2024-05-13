import Currency from '../dao/mongo/classes/currency.dao.js';
import Factor from '../dao/mongo/classes/factor.dao.js';
import Product from '../dao/mongo/classes/product.dao.js';
import Supplier from '../dao/mongo/classes/supplier.dao.js';
import User from '../dao/mongo/classes/user.dao.js';
import CurrencyRepository from './currency.repository.js';
import FactorRepository from './factor.repository.js';
import ProductRepository from './product.repository.js';
import SupplierRepository from './supplier.repository.js';
import UserRepository from './user.repository.js';

export const productService = new ProductRepository(new Product());
export const supplierService = new SupplierRepository(new Supplier());
export const factorService = new FactorRepository(new Factor());
export const currencyService = new CurrencyRepository(new Currency());
export const userService = new UserRepository(new User());
