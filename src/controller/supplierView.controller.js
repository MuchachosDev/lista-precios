import SupplierDTO from "../dto/supplier.dto.js";
import { supplierService } from "../repositories/index.repository.js";

export const manageSupplierPage = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });

    return res.render("manageSuppliers", {
      title: "Administrar Proveedores",
      suppliers: suppliersDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const addSupplierPage = async (req, res) => {
  return res.render("addSupplier");
};

export const editSupplierPage = async (req, res) => {
  try {
    const { sid } = req.params;

    const supplier = await supplierService.getSupplierById(sid);

    const supplierDTO = SupplierDTO.getSuppliersToPage(supplier);

    return res.render("editSupplier", {
      title: "Editar Proveedor",
      supplier: supplierDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
