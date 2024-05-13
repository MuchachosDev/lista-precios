import FactorDTO from '../dto/factor.dto.js';
import SupplierDTO from '../dto/supplier.dto.js';
import {
  factorService,
  supplierService,
} from '../repositories/index.repository.js';

export const addFactorPage = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });
    return res.render('addFactor', {
      title: 'AGREGAR FACTOR',
      suppliers: suppliersDTO,
    });
  } catch (error) {
    res.sendClientError(error);
  }
};

export const manageFactorsPage = async (req, res) => {
  try {
    const factors = await factorService.getAllFactors();

    const factorsDTO = factors.map((factor) => {
      return FactorDTO.getFactorToPage(factor);
    });

    return res.render('manageFactors', {
      title: 'ADMISTRAR FACTORES',
      factors: factorsDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editFactorPage = async (req, res) => {
  try {
    const { fid } = req.params;
    const factor = await factorService.getFactorById(fid);
    const suppliers = await supplierService.getAllSuppliers();

    const factorDTO = FactorDTO.getFactorToPage(factor);

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });

    return res.render('editFactor', {
      title: 'EDITAR FACTOR',
      factor: factorDTO,
      suppliers: suppliersDTO,
      supplierToFactor: factor.supplier._id,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
