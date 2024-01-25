import fs from "fs";
import ProductDTO from "../dto/product.dto.js";
import {
  factorService,
  productService,
} from "../repositories/index.repository.js";
import { productModel } from "../dao/mongo/models/product.model.js";

export const addFile = async (req, res) => {
  const { products, factor } = req.body;
  await productModel.deleteMany({ brand: "AEA" });
  try {
    const existFactor = await factorService.getFactorById(factor);

    if (!existFactor) {
      return res.sendNotFound({ message: "Factor not found" });
    }
    for (const product of products) {
      const exist = await productService.getExactProduct(
        product.code,
        product.brand,
        existFactor._id,
      );
      if (exist) {
        const comparation = new ProductDTO(product).equals(exist);
        if (
          comparation.code &&
          comparation.description &&
          comparation.iva &&
          comparation.currency &&
          comparation.list_price
        ) {
          req.logger.debug(`Product ${exist.code} is actualized`);
        } else {
          const keys = Object.keys(comparation);
          const productUpdate = keys.reduce((store, key) => {
            if (!comparation[key]) {
              if (key === "list_price") {
                exist.list_price.map((price) => (price.status = false));
                exist.list_price.push(product.list_price[0]);
                store[key] = exist.list_price;
              } else {
                store[key] = product[key];
              }
            }
            return store;
          }, {});

          const response = await productService.updateProduct(
            exist._id,
            productUpdate,
          );

          if (!response) {
            return res.sendClientError({
              message: `Error to update price to product ${exist.code}`,
            });
          }
          req.logger.debug(`Product ${exist.code} updated successfully`);
        }
      } else {
        const response = await productService.addProduct({
          ...product,
          factor: factor,
        });

        if (!response) {
          return res.sendClientError(response);
        } else {
          req.logger.debug(`Product ${response.code} added successfully`);
        }
      }
    }
    fs.renameSync(req.file.path, req.file.path.replace("pending", "completed"));
    return res.sendSuccessCreated({ message: "Products added/modified" });
  } catch (error) {
    return res.sendClientError(error);
  }
};
