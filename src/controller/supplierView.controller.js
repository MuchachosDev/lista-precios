import DollarDTO from "../dto/dollar.dto.js";
import SupplierDTO from "../dto/supplier.dto.js";
import {
  dollarService,
  supplierService,
} from "../repositories/index.repository.js";

export const manageSupplierPage = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });

    console.log(suppliersDTO);
    return res.render("manageSuppliers", {
      title: "Administrar Proveedores",
      suppliers: suppliersDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const addSupplierPage = async (req, res) => {
  try {
    const dollars = await dollarService.getDollars();
    const dollarsDTO = DollarDTO.getDollarsToPage(dollars);

    return res.render("addSupplier", {
      title: "Agregar Proveedor",
      dollars: dollarsDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const editSupplierPage = async (req, res) => {
  try {
    const { sid } = req.params;

    const supplier = await supplierService.getSupplierById(sid);
    const dollars = await dollarService.getDollars();

    const supplierDTO = SupplierDTO.getSuppliersToPage(supplier[0]);
    console.log(supplierDTO);
    const dollarsDTO = DollarDTO.getDollarsToPage(dollars);

    return res.render("editSupplier", {
      title: "Editar Proveedor",
      supplier: supplierDTO,
      dollars: dollarsDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
