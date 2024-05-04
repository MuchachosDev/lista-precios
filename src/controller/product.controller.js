import {
  factorService,
  productService,
  supplierService,
} from '../repositories/index.repository.js';

export const addFile = async (req, res) => {
  const { products, factor, sid } = req.body;
  try {
    const existFactor = await factorService.getFactorById(factor);

    if (!existFactor) {
      return res.sendNotFound({ message: 'Factor not found' });
    }

    const existSupplier = await supplierService.getSupplierById(sid);

    if (!existSupplier) {
      return res.sendNotFound({ message: 'Supplier not found' });
    }
    for (const product of products) {
      const productAdded = await productService.addProduct({
        ...product,
        factor: existFactor._id,
        supplier: sid,
      });

      if (!productAdded) {
        return res.sendClientError({
          message: 'Error adding products',
        });
      }
    }
    return res.sendSuccessCreated({ message: 'Products added' });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const updatePricePerItem = async (req, res) => {
  let { sid, item, sub_item } = req.query;
  const { percentage, adjustment_type } = req.body;

  if (percentage == 0) {
    return res.sendClientError({ message: "Percentage can't be 0" });
  } else if (percentage < 0) {
    return res.sendClientError({ message: "Percentage can't be negative" });
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
        message: 'Error updating price',
      });
    }

    return res.sendSuccess({ message: 'Price/s updated' });
  } catch (error) {
    return res.sendClientError(error);
  }
};
