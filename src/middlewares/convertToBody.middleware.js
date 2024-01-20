import ProductDTO from "../dto/product.dto.js";
import xlsx from "xlsx";
import { dollarService } from "../repositories/index.repository.js";

export const convertToBody = async (req, res, next) => {
  const { file } = req;
  req.body.products = [];
  const regex = /^["]*(.+);(.+);(.+);(.+);(.+);(.+)["]*$/;
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const csv = xlsx.utils.sheet_to_csv(worksheet, { FS: ";" });

  const rows = csv.split("\n").slice(1);
  const { dollar } = await dollarService.getDollar();
  rows.forEach((row) => {
    if (row.match(regex)) {
      const product = new ProductDTO({
        code: row.match(regex)[1],
        description: row.match(regex)[2],
        brand: row.match(regex)[3],
        factor: null,
        list_price: parseFloat(row.match(regex)[4]),
        currency: row.match(regex)[5],
        iva: parseFloat(row.match(regex)[6].replace(".", "").replace(",", ".")),
        tag_file: file.filename,
        dollar,
      });
      req.body.products.push(product);
    }
  });
  next();
};
