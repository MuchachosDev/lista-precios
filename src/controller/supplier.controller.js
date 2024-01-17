import SupplierDTO from "../dto/supplier.dto.js";
import { supplierService } from "../repositories/index.repository.js";

export const addSupplier = async (req, res) => {
  const { supplier } = req.body;
  try {
    const exist = await supplierService.getSupplierByName(supplier);

    if (exist) return res.sendClientError("Supplier already exists");

    const response = await supplierService.addSupplier(
      new SupplierDTO(supplier),
    );

    if (!response) return res.sendClientError("Supplier not created");
    return res.sendSuccessCreated(supplier);
  } catch (error) {
    return res.sendClientError(error);
  }
};
