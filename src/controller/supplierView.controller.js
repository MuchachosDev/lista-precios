import CurrencyDTO from '../dto/currency.dto.js';
import SupplierDTO from '../dto/supplier.dto.js';
import {
  currencyService,
  supplierService,
} from '../repositories/index.repository.js';

export const manageSupplierPage = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });
    return res.render('manageSuppliers', {
      title: 'ADMINISTRAR PROVEEDORES',
      suppliers: suppliersDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const addSupplierPage = async (req, res) => {
  try {
    const currencys = await currencyService.getCurrencys();
    const currencysDTO = CurrencyDTO.getCurrencysToPage(currencys);

    return res.render('addSupplier', {
      title: 'AGREGAR PROVEEDOR',
      currencys: currencysDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editSupplierPage = async (req, res) => {
  try {
    const { sid } = req.params;

    const supplier = await supplierService.getSupplierById(sid);
    const currencys = await currencyService.getCurrencys();

    const supplierDTO = SupplierDTO.getSuppliersToPage(supplier[0]);
    const currencysDTO = CurrencyDTO.getCurrencysToPage(currencys);

    return res.render('editSupplier', {
      title: 'EDITAR PROVEEDOR',
      supplier: supplierDTO,
      currencys: currencysDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
