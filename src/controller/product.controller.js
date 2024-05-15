import {
  factorService,
  productService,
  supplierService,
} from '../repositories/index.repository.js';
import { parseTextToIva, parseTextToNumber } from '../util/parser.util.js';

export const addFile = async (req, res) => {
  const { products, factor, sid } = req.body;
  try {
    const existFactor = await factorService.getFactorById(factor);

    if (!existFactor) {
      return res.sendNotFound({ message: 'Factor no encontrado' });
    }

    const existSupplier = await supplierService.getSupplierById(sid);

    if (!existSupplier) {
      return res.sendNotFound({ message: 'Proveedor no encontrado' });
    }

    let existProducts = 0;
    let addedProducts = 0;
    const duplicateProducts = [];

    for (const product of products) {
      const exist = await productService.getProductsWithFilter({
        model: product.model,
        brand: product.brand,
        sku: product.sku,
        sub_item: product.sub_item,
      });

      if (exist.length > 0) {
        existProducts++;
        duplicateProducts.push(product); // Añadir producto a la lista de duplicados
        continue;
      }

      const productAdded = await productService.addProduct({
        ...product,
        factor: existFactor._id,
        supplier: sid,
      });

      if (!productAdded) {
        return res.sendClientError({
          message: 'Error al agregar productos',
        });
      }
      addedProducts++;
    }

    return res.sendSuccessCreated({
      message: `${addedProducts} productos agregados, ${existProducts} productos ya existen`,
       duplicateProducts,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const updatePricePerItem = async (req, res) => {
  let { sid, item, sub_item } = req.query;
  const { percentage, adjustment_type } = req.body;

  if (percentage == 0) {
    return res.sendClientError({ message: 'Porcentaje no puede ser 0' });
  } else if (percentage < 0) {
    return res.sendClientError({ message: 'Porcentaje no puede ser negativo' });
  }

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
    const updated = await productService.updatePriceList(
      sid,
      item,
      sub_item,
      parseFloat(percentage),
      adjustment_type
    );

    if (!updated) {
      return res.sendClientError({
        message: 'Error al actualizar precios',
      });
    }

    return res.sendSuccess({ message: 'Precios actualizados' });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  let {
    model,
    description,
    bar_code,
    sku,
    brand,
    presentation,
    iva,
    price_list,
    supplier,
    item,
    sub_item,
    factor,
  } = req.body;

  if (
    !model ||
    !description ||
    !brand ||
    !presentation ||
    !iva ||
    !price_list ||
    !supplier ||
    !item ||
    !sub_item ||
    !factor
  ) {
    return res.sendClientError({ message: 'Todos los campos son requeridos' });
  }
  if (iva < 0 || iva > 100) {
    return res.sendClientError({ message: 'IVA debe estar entre 0 y 100' });
  }
  if (price_list < 0) {
    return res.sendClientError({
      message: 'Precio de lista no puede ser negativo',
    });
  }
  try {
    const updated = await productService.updateProduct(pid, {
      model: model.trim(),
      description: description.trim(),
      bar_code: bar_code.trim(),
      sku: sku.trim(),
      brand: brand.trim(),
      presentation: presentation.trim(),
      iva: parseTextToIva(iva),
      price_list: parseTextToNumber(price_list),
      supplier,
      item: item.trim(),
      sub_item: sub_item.trim(),
      factor: factor.substring(0, factor.indexOf('-')).trim(),
    });

    if (!updated) {
      return res.sendClientError({
        message: 'Error al actualizar producto',
      });
    }

    return res.sendSuccess({ message: 'Productos actualizados' });
  } catch (error) {
    return res.sendClientError(error);
  }
};
