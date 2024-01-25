import SupplierDTO from "../dto/supplier.dto.js";
import { supplierService } from "../repositories/index.repository.js";

export const addSupplier = async (req, res) => {
  const { supplier } = req.body;
  try {
    const exist = await supplierService.getSupplierByName(supplier);

    if (exist) return res.sendClientError("Supplier already exists");

    const response = await supplierService.addSupplier(
      new SupplierDTO(supplier.trim().toUpperCase()),
    );

    if (!response) return res.sendClientError("Supplier not created");
    return res.sendSuccessCreated(supplier);
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editSupplier = async (req, res) => {
  const { name } = req.body;
  const { sid } = req.params;
  try {
    const exist = await supplierService.getSupplierByName(name);

    if (exist) return res.sendClientError("Supplier already exists");

    const response = await supplierService.updateSupplier(
      new SupplierDTO(name.trim().toUpperCase()),
      sid,
    );

    if (!response) return res.sendClientError("Supplier not updated");
    return res.sendSuccessCreated({ message: "Supplier updated successfully" });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const deleteSupplier = async (req, res) => {
  const { sid } = req.params;
  try {
    const response = await supplierService.deleteSupplier(sid);

    if (!response) return res.sendClientError("Supplier not deleted");
    return res.sendSuccessCreated({ message: "Supplier deleted successfully" });
  } catch (error) {
    return res.sendClientError(error);
  }
};
