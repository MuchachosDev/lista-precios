import envConfig from '../config/env.config.js';
import FactorDTO from '../dto/factor.dto.js';
import ProductDTO from '../dto/product.dto.js';
import SupplierDTO from '../dto/supplier.dto.js';
import {
  factorService,
  productService,
  supplierService,
} from '../repositories/index.repository.js';
import bwipjs from 'bwip-js';

export const getHomePage = async (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

export const getUploadDocumentPage = async (req, res) => {
  try {
    const factors = await factorService.getAllFactors();

    if (factors.length === 0) {
      return res.redirect('/incomplete?incomplete=Factores y/o Proveedores');
    }

    const factorsDTO = factors.map((factor) => {
      return FactorDTO.getFactorToPage(factor);
    });

    return res.render('uploadDocument', {
      title: 'Upload Documents',
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
      filter = '';
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
    if (sort === '1') {
      sort = 1;
    } else if (sort === '-1') {
      sort = -1;
    }
    if (brand) {
      brand = brand.trim().toUpperCase();
    } else {
      brand = '';
    }

    const { docs, hasNextPage, hasPrevPage, prevPage, nextPage, totalDocs } =
      await productService.getProductsWithPagination(
        filter,
        page,
        limit,
        sort,
        brand
      );

    const productsDTO = docs.map((product) => {
      return ProductDTO.getProductToListView(product);
    });

    const brands = await productService.getDistinticBrands();

    return res.render('listProducts', {
      title: 'List Products',
      styles: 'styles',
      products: productsDTO,
      filter,
      page,
      limit,
      totalDocs,
      hasNextPage,
      hasPrevPage,
      prevPage:
        `${envConfig.API}/list-products?page=${prevPage}` +
        `${limit ? `&limit=${limit}` : ''}` +
        `${filter ? `&filter=${filter}` : ''}` +
        `${brand ? `&brand=${brand}` : ''}` +
        `${sort ? `&sort=${sort}` : ''}`,
      nextPage:
        `${envConfig.API}/list-products?page=${nextPage}` +
        `${limit ? `&limit=${limit}` : ''}` +
        `${filter ? `&filter=${filter}` : ''}` +
        `${brand ? `&brand=${brand}` : ''}` +
        `${sort ? `&sort=${sort}` : ''}`,
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
    sid = 'all-suppliers';
  }
  if (!item) {
    item = 'all-items';
  }
  if (!sub_item) {
    sub_item = 'all-sub-items';
  }

  try {
    const suppliers = await supplierService.getAllSuppliers();
    const items = await productService.getDistinctItems(
      sid === 'all-suppliers' ? null : sid
    );
    const subItems = await productService.getDistinctSubItems(
      item === 'all-items' ? null : item
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
    return res.render('updatePricesList', {
      title: 'Update Prices',
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

export const getGenerateCodebarsPage = async (req, res) => {
  let { sid, item, sub_item } = req.query;

  if (!sid) {
    sid = 'all-suppliers';
  }
  if (!item) {
    item = 'all-items';
  }
  if (!sub_item) {
    sub_item = 'all-sub-items';
  }

  try {
    const suppliers = await supplierService.getAllSuppliers();
    const items = await productService.getDistinctItems(
      sid === 'all-suppliers' ? null : sid
    );
    const subItems = await productService.getDistinctSubItems(
      item === 'all-items' ? null : item
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
    return res.render('generateCodebars', {
      title: 'Update Prices',
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

export const getCodebarsPrintPage = async (req, res) => {
  let { sid, item, sub_item, codeType } = req.query;
  const filter = {
    supplier: sid === 'all-suppliers' ? undefined : sid,
    item: item === 'all-items' ? undefined : item,
    sub_item: sub_item === 'all-sub-items' ? undefined : sub_item,
  };
  if (codeType !== 'code128' && codeType !== 'qrcode') {
    codeType = 'code128';
  }

  Object.keys(filter).forEach(
    (key) => filter[key] === undefined && delete filter[key]
  );

  try {
    const products = await productService.getProductsWithFilter(filter);

    const productsDTO = await Promise.all(
      products.map(async (product) => {
        try {
          const imageData = await bwipjs.toBuffer({
            bcid: codeType,
            text: product.internal_id,
            scale: 1,
            includetext: true,
            textxalign: 'center',
          });

          const imageSrc = `data:image/png;base64,${imageData.toString('base64')}`;

          return { description: product.description, bar_code: imageSrc };
        } catch (error) {
          console.error(
            'Error generating barcode for product',
            product.description,
            error
          );
          return null;
        }
      })
    );

    return res.render('codebarsPrint', {
      title: 'Imprimir Codigos de Barras',
      products: productsDTO,
    });
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({ error: 'Error fetching products', details: error });
  }
};

export const getEditProductPage = async (req, res) => {
  const { pid } = req.params;
  let { sid } = req.query;

  try {
    const product = await productService.getProductById(pid);
    const factors = await factorService.getFactorsBySupplier(
      sid ?? product.supplier._id.toString()
    );
    const suppliers = await supplierService.getAllSuppliers();

    const suppliersDTO = suppliers.map((supplier) => {
      return SupplierDTO.getSuppliersToPage(supplier);
    });

    let itemsDTO = [];
    let subItemsDTO = [];
    if (!sid) {
      sid = product.supplier._id.toString();
    }
    if (product.supplier._id.toString() === sid) {
      const items = await productService.getDistinctItems(product.supplier._id);
      const subItems = await productService.getDistinctSubItems(
        sid,
        product.item
      );
      itemsDTO = items.map((item) => {
        return ProductDTO.getItemToProduct(item);
      });

      subItemsDTO = subItems.map((subItem) => {
        return ProductDTO.getSubItemToProduct(subItem);
      });
    } else {
      const items = await productService.getDistinctItems(sid);
      const subItems = await productService.getDistinctSubItems(sid);
      itemsDTO = items.map((item) => {
        return ProductDTO.getItemToProduct(item);
      });

      subItemsDTO = subItems.map((subItem) => {
        return ProductDTO.getSubItemToProduct(subItem);
      });
    }
    const productDTO = ProductDTO.getProductToEditPage(product);
    const factorsDTO = factors.map((factor) => {
      return FactorDTO.getFactorToPage(factor);
    });

    return res.render('editProduct', {
      title: 'Edit Product',
      product: productDTO,
      currency: {
        name: `${product.supplier.dollar?.name ?? 'Peso'} ${product.supplier.dollar?.value ? '(USD)' : '(ARS)'}`,
        value: product.supplier.dollar?.value,
      },
      factors: factorsDTO,
      suppliers: suppliersDTO,
      items: itemsDTO,
      sub_items: subItemsDTO,
      sid: sid ?? product.supplier._id.toString(),
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
