import multer from "multer";
import { upload } from "../config/multer.config.js";

export const uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please upload files." });
    }
    next();
  });
};
