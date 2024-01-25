import ProductDTO from "../dto/product.dto.js";
import xlsx from "xlsx";
import { dollarService } from "../repositories/index.repository.js";
import { parseTextToNumber } from "../util/parser.util.js";

export const convertToBody = async (req, res, next) => {
  const { file } = req;
  req.body.products = [];
  const regex = /^["]*(.+);(.+);(.+);(.+);(.+);(.+)["]*$/;
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const csv = xlsx.utils.sheet_to_csv(worksheet, { FS: ";" });

  const rows = csv.split("\n").slice(1);
  const { _id } = await dollarService.getDollar();
  rows.forEach((row) => {
    if (row.match(regex)) {
      const product = new ProductDTO({
        code: row.match(regex)[1].trim().toUpperCase(),
        description: row.match(regex)[2].trim().toUpperCase(),
        brand: row.match(regex)[3].trim().toUpperCase(),
        factor: null,
        list_price: parseTextToNumber(row.match(regex)[4].trim()),
        currency: row.match(regex)[5].trim().toUpperCase(),
        iva: parseTextToNumber(row.match(regex)[6].trim()),
        tag_file: file.filename.trim().toUpperCase(),
        dollar: _id,
      });
      req.body.products.push(product);
    } else {
      console.log(row);
    }
  });
  next();
};
