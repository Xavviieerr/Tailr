import { Request, Response, NextFunction } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

//temporary storage
const upload = multer({ dest: "temp_uploads/" });

export const extractCvText = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("cvFile")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Multer error: ${err.message}` });
      } else {
        return res.status(500).json({ error: `Upload failed: ${err.message}` });
      }
    }
    return next();
  });

  const file = req.file;
  console.log(file);
  if (!file) {
    if (req.body.previousCvText) {
      return next();
    }
    return res.status(400).json({ error: "No CV file uploaded." });
  }

  const filePath = file.path;
  const fileExtension = path.extname(file.originalname).toLowerCase();
  let extractedText = "";

  try {
    if (fileExtension === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else if (fileExtension === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse(dataBuffer);
      const result = await parser.getText();
      extractedText = result.text;
    } else {
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ error: `Unsupported file type: ${fileExtension}` });
    }

    (req.body as any).previousCv = extractedText;
    fs.unlinkSync(filePath);
    next();
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Document parsing error:", error);
    return res.status(500).json({ error: "Failed to read document content." });
  }
};
