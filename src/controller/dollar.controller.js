import { dollarService } from "../repositories/index.repository.js";

export const changeDollar = async (req, res) => {
  try {
    const { did } = req.params;
    const { value, name } = req.body;

    const dollar = await dollarService.updateDollar(did, { value, name });

    if (!dollar) {
      return res.sendClientError({ message: "Dollar cannot be edited" });
    }
    return res.sendSuccess({ message: "Dollar edited" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
