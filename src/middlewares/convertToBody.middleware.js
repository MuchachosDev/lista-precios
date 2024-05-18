import ProductDTO from '../dto/product.dto.js';
import xlsx from 'xlsx';
import { parseTextToIva, parseTextToNumber } from '../util/parser.util.js';

export const convertToBody = async (req, res, next) => {
  const { file } = req;
  req.body.products = [];
  const regex = /^["]*(.*);(.*);(.*);(.*);(.*);(.*);(.*);(.*);(.*);(.*)["]*$/;
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const csv = xlsx.utils.sheet_to_csv(worksheet, { FS: ';' });

  const rows = csv
    .split('\n')
    .slice(1)
    .filter((row) => row.split(';').some((field) => field.trim()));

  rows.forEach((row) => {
    if (row.match(regex)) {
      const product = new ProductDTO({
        bar_code: row.match(regex)[1],
        sku: row.match(regex)[2],
        model: row.match(regex)[3],
        description: row.match(regex)[4],
        brand: row.match(regex)[5],
        item: row.match(regex)[6],
        sub_item: row.match(regex)[7],
        presentation: row.match(regex)[8],
        iva: row.match(regex)[9],
        price_list: row.match(regex)[10],
      });
      req.body.products.push(product);
    }
  });
  next();
};
