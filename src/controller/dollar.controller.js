import DollarDTO from "../dto/dollar.dto.js";
import { dollarService } from "../repositories/index.repository.js";

export const changeDollar = async (req, res) => {
  try {
    const { value } = req.body;

    const actualDollar = await dollarService.getDollar();

    if (!actualDollar) {
      return res.sendClientError({ message: "Dollar not found" });
    }
    const disable = await dollarService.disableDollar(actualDollar._id);

    if (!disable)
      return res.sendClientError({ message: "Dollar cannot be disabled" });

    const newDollar = await dollarService.addDollar(new DollarDTO({ value }));

    if (!newDollar)
      return res.sendClientError({ message: "Dollar cannot be added" });

    return res.sendSuccessCreated({ message: "Dollar edited" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
