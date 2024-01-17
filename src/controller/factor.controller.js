import FactorDTO from "../dto/factor.dto.js";
import {
  factorService,
  supplierService,
} from "../repositories/index.repository.js";

export const addFactor = async (req, res) => {
  try {
    const { value, supplier } = req.body;

    const sup = await supplierService.getSupplierById(supplier);

    if (!sup) return res.sendNotFound("Supplier not found");

    const response = await factorService.addFactor(
      new FactorDTO(parseFloat(value), sup._id),
    );

    if (!response) return res.sendClientError("Factor not added");
    return res.sendSuccessCreated({ message: "Factor added successfully" });
  } catch (error) {
    return res.sendClientError(error);
  }
};
