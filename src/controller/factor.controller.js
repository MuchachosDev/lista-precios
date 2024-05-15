import FactorDTO from '../dto/factor.dto.js';
import {
  factorService,
  productService,
  supplierService,
} from '../repositories/index.repository.js';
import { parseTextToNumber } from '../util/parser.util.js';

export const addFactor = async (req, res) => {
  try {
    const { value, supplier, name } = req.body;

    const sup = await supplierService.getSupplierById(supplier);

    if (!sup) return res.sendNotFound('Supplier not found');

    const response = await factorService.addFactor(
      new FactorDTO(parseTextToNumber(value.trim()), sup[0]._id, name.trim())
    );

    if (!response) return res.sendClientError('Factor not added');
    return res.sendSuccessCreated({ message: 'Factor added successfully' });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editFactor = async (req, res) => {
  try {
    const { fid } = req.params;
    const { value, sid, name } = req.body;

    const factorDTO = new FactorDTO(
      parseTextToNumber(value.trim()),
      sid,
      name.trim().toUpperCase()
    );

    const response = await factorService.updateFactor(fid, factorDTO);

    if (!response) return res.sendClientError('Factor not updated');

    return res.sendSuccessCreated({ message: 'Factor updated successfully' });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const deleteFactor = async (req, res) => {
  try {
    const { fid } = req.params;

    const existProduct = await productService.getProductByFactorId(fid);

    if (existProduct)
      return res.sendUnauthorized({
        message: 'Factor has products, please delete products first',
      });

    const response = await factorService.deleteFactor(fid);

    if (!response) return res.sendClientError('Factor not deleted');

    return res.sendSuccess({ message: 'Factor deleted successfully' });
  } catch (error) {
    return res.sendClientError(error);
  }
};
