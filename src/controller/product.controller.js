import {
  factorService,
  productService,
} from "../repositories/index.repository.js";

export const addFile = async (req, res) => {
  const { products, factor } = req.body;

  try {
    const existFactor = await factorService.getFactorById(factor);

    if (!existFactor) {
      return res.sendNotFound({ message: "Factor not found" });
    }

    for (const product of products) {
      const exist = await productService.getProductByCode(product.code);

      if (
        exist &&
        exist.list_price[exist.list_price.length - 1].price !==
          product.list_price[0].price
      ) {
        let update = await productService.updatePriceToProduct(
          exist.code,
          product.list_price[0],
        );

        if (!update) {
          return res.sendClientError({
            message: `Error to update price to product ${exist.code}`,
          });
        }
        req.logger.debug(`Product ${exist.code} updated successfully`);
      } else if (!exist) {
        const response = await productService.addProduct({
          ...product,
          factor: factor,
        });

        if (!response) {
          return res.sendClientError(response);
        } else {
          req.logger.debug(`Product ${response.code} added successfully`);
        }
      } else {
        return;
      }
    }
    return res.sendSuccessCreated({ message: "Products added/modified" });
  } catch (error) {
    return res.sendClientError(error);
  }
};
