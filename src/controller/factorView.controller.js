import SupplierDTO from "../dto/supplier.dto.js";
import { supplierService } from "../repositories/index.repository.js";

export const addFactorPage = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });
    return res.render("createFactor", {
      title: "Add Factor",
      suppliers: suppliersDTO,
    });
  } catch (error) {
    res.sendClientError(error);
  }
};
