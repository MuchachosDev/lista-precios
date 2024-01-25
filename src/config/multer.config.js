import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join("./public/uploads/pending/");

    fs.mkdirSync(uploadPath, { recursive: true });
    fs.mkdirSync(uploadPath.replace("pending", "completed"), {
      recursive: true,
    });
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    let fechaHora =
      new Date().toLocaleDateString().replace(/\//g, "-") +
      "#" +
      new Date().toLocaleTimeString().replace(/:/g, "-");
    callback(null, `${fechaHora}#${file.originalname}`);
  },
});
export const upload = multer({ storage }).single("file");
