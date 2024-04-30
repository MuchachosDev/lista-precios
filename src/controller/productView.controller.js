import envConfig from "../config/env.config.js";
import FactorDTO from "../dto/factor.dto.js";
import ProductDTO from "../dto/product.dto.js";
import SupplierDTO from "../dto/supplier.dto.js";
import {
  factorService,
  productService,
  supplierService,
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
    let { filter, page, limit, sort, brand } = req.query;

    if (!filter) {
      filter = "";
    }
    if (!page) {
      page = 1;
    } else {
      page = parseInt(page);
    }

    if (!limit) {
      limit = 12;
    } else {
      limit = parseInt(limit);
    }
    if (sort === "1") {
      sort = 1;
    } else if (sort === "-1") {
      sort = -1;
    }
    if (brand) {
      brand = brand.trim().toUpperCase();
    } else {
      brand = "";
    }

    const { docs, hasNextPage, hasPrevPage, prevPage, nextPage, totalDocs } =
      await productService.getProductsWithParams(
        filter,
        page,
        limit,
        sort,
        brand,
      );

    const productsDTO = docs.map((product) => {
      return ProductDTO.getProductToListView(product);
    });

    const brands = await productService.getDistinticBrands();

    console.log(brands);

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
        `${filter ? `&filter=${filter}` : ""}` +
        `${brand ? `&brand=${brand}` : ""}` +
        `${sort ? `&sort=${sort}` : ""}`,
      nextPage:
        `${envConfig.API}/list-products?page=${nextPage}` +
        `${limit ? `&limit=${limit}` : ""}` +
        `${filter ? `&filter=${filter}` : ""}` +
        `${brand ? `&brand=${brand}` : ""}` +
        `${sort ? `&sort=${sort}` : ""}`,
      brands,
      sort,
      brandSelected: brand,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const getUpdatePricesListPage = async (req, res) => {
  let { sid, item, sub_item } = req.query;

  if (!sid) {
    sid = "all-suppliers";
  }
  if (!item) {
    item = "all-items";
  }
  if (!sub_item) {
    sub_item = "all-sub-items";
  }

  try {
    const suppliers = await supplierService.getAllSuppliers();
    const items = await productService.getDistinctItems(
      sid === "all-suppliers" ? null : sid,
    );
    const subItems = await productService.getDistinctSubItems(
      item === "all-items" ? null : item,
    );

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });

    const itemsDTO = items.map((item) => {
      return ProductDTO.getItemToProduct(item);
    });

    const subItemsDTO = subItems.map((subItem) => {
      return ProductDTO.getSubItemToProduct(subItem);
    });
    console.log(item);
    return res.render("updatePricesList", {
      title: "Update Prices",
      suppliers: suppliersDTO,
      items: itemsDTO,
      item: item,
      sub_items: subItemsDTO,
      sub_item: sub_item,
      sid,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
