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

    const existSupplier = await supplierService.getSupplierById(supplier);
    if (!existSupplier) return res.sendNotFound('Supplier not found');

    const factorDTO = new FactorDTO(
      parseTextToNumber(value.trim()),
      existSupplier[0]._id,
      name
    );
    const factors = await factorService.getFactorsBySupplier(supplier);

    const existFactor = factors.find(
      (factor) => factor.name === factorDTO.name
    );

    if (existFactor.length > 0)
      return res.sendUnauthorized({ message: 'Factor already exists' });

    const response = await factorService.addFactor(factorDTO);

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

    const existFactor = await factorService.getFactorById(fid);

    if (
      existFactor &&
      existFactor._id.toString() !== fid &&
      existFactor.name === name
    ) {
      return res.sendUnauthorized({
        message: 'Exist a factor with that name or value',
      });
    }

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
