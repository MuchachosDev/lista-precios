import DollarDTO from "../dto/dollar.dto.js";
import { dollarService } from "../repositories/index.repository.js";

export const getDollarPage = async (req, res) => {
  try {
    const response = await dollarService.getDollar();
    const dollarDTO = DollarDTO.getDollarToPage(response);
    return res.render("editDollar", {
      title: "Edit Dollar",
      dollar: dollarDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
