import ProductDTO from "..//dto/product.dto.js";
import xlsx from "xlsx";

export const convertToBody = (req, res, next) => {
  const { file } = req;
  req.body.products = [];
  const regex = /^["]*(.+);(.+);(.+);(.+);(.+);(.+)["]*$/;
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const csv = xlsx.utils.sheet_to_csv(worksheet, { FS: ";" });

  const rows = csv.split("\n").slice(1);

  rows.forEach((row) => {
    if (row.match(regex)) {
      const product = new ProductDTO(
        row.match(regex)[1],
        row.match(regex)[2],
        row.match(regex)[3],
        null,
        row.match(regex)[4],
        row.match(regex)[5],
        row.match(regex)[6],
        file.filename,
      );
      req.body.products.push(product);
    }
  });
  next();
};
