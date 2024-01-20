import envConfig from "../config/env.config.js";
import DollarDTO from "../dto/dollar.dto.js";
import { dollarService } from "../repositories/index.repository.js";

export const defaultDollar = async () => {
  const response = await dollarService.getDollar();

  if (!response) {
    const newDollar = await dollarService.addDollar(
      new DollarDTO({ value: envConfig.DEFAULT_DOLLAR }),
    );

    if (!newDollar) {
      console.log("Dollar cannot be added");
    } else {
      console.log("Dollar added");
    }
  }
};
