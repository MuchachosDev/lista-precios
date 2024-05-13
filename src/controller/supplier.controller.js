import SupplierDTO from '../dto/supplier.dto.js';
import {
  factorService,
  productService,
  supplierService,
} from '../repositories/index.repository.js';

export const addSupplier = async (req, res) => {
  const { name, dollar, enableCurrencySelect } = req.body;
  try {
    const exist = await supplierService.getSupplierByName(name);

    if (exist) return res.sendClientError('Supplier already exists');
    let response;
    if (enableCurrencySelect) {
      response = await supplierService.addSupplier(
        new SupplierDTO(name.trim(), dollar)
      );
    } else {
      response = await supplierService.addSupplier(
        new SupplierDTO(name.trim(), null)
      );
    }

    if (!response) return res.sendClientError('Supplier not created');
    return res.sendSuccessCreated(name);
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editSupplier = async (req, res) => {
  const { name, dollar, enableCurrencySelect } = req.body;
  const { sid } = req.params;
  try {
    const exist = await supplierService.getSupplierById(sid);

    if (exist.name === name && exist.dollar === enableCurrencySelect)
      return res.sendClientError('Supplier already exists');
    let response;

    if (enableCurrencySelect) {
      response = await supplierService.updateSupplier(
        new SupplierDTO(name.trim().toUpperCase(), dollar),
        sid
      );
    } else {
      response = await supplierService.updateSupplier(
        new SupplierDTO(name.trim().toUpperCase(), null),
        sid
      );
    }

    if (!response) return res.sendClientError('Supplier not updated');
    return res.sendSuccessCreated({ message: 'Supplier updated successfully' });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const deleteSupplier = async (req, res) => {
  const { sid } = req.params;
  try {
    const existProduct = await productService.getProductsBySupplier(sid);

    if (existProduct.length > 0) {
      return res.sendClientError({
        message: "Supplier has products, can't be deleted",
      });
    }

    const existFactors = await factorService.getFactorsBySupplier(sid);

    if (existFactors.length > 0) {
      return res.sendClientError({
        message: "Supplier has factors, can't be deleted",
      });
    }
    const response = await supplierService.deleteSupplier(sid);

    if (!response) return res.sendClientError('Supplier not deleted');
    return res.sendSuccessCreated({ message: 'Supplier deleted successfully' });
  } catch (error) {
    return res.sendClientError(error);
  }
};
