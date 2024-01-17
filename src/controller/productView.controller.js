import envConfig from "../config/env.config.js";
import FactorDTO from "../dto/factor.dto.js";
import ProductDTO from "../dto/product.dto.js";
import {
  factorService,
  productService,
} from "../repositories/index.repository.js";

export const getHomePage = async (req, res) => {
  res.render("home", {
    title: "Home",
  });
};

export const getUploadDocumentPage = async (req, res) => {
  try {
    const factors = await factorService.getAllFactors();

    if (factors.length === 0) {
      return res.redirect("/incomplete?incomplete=Factores y/o Proveedores");
    }

    const factorsDTO = factors.map((factor) => {
      return FactorDTO.getFactorToPage(factor);
    });

    return res.render("uploadDocument", {
      title: "Upload Documents",
      factors: factorsDTO,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const getListProductsPage = async (req, res) => {
  try {
    let { filter, page, limit } = req.query;

    if (!filter) {
      filter = "";
    }
    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 16;
    }

    const { docs, hasNextPage, hasPrevPage, prevPage, nextPage, totalDocs } =
      await productService.getProductsWithParams(filter || "", page, limit);

    const productsDTO = docs.map((product) => {
      return ProductDTO.getProductToListView(product);
    });
    return res.render("listProducts", {
      title: "List Products",
      styles: "styles",
      products: productsDTO,
      filter,
      page,
      limit,
      totalDocs,
      hasNextPage,
      hasPrevPage,
      prevPage:
        `${envConfig.API}/list-products?page=${prevPage}` +
        `${limit ? `&limit=${limit}` : ""}` +
        `${filter ? `&filter=${filter}` : ""}`,
      nextPage:
        `${envConfig.API}/list-products?page=${nextPage}` +
        `${limit ? `&limit=${limit}` : ""}` +
        `${filter ? `&filter=${filter}` : ""}`,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
