import { Request, Response, NextFunction } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const upload = multer({ dest: "temp_uploads/" });

export const extractCvText = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("previousCv")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Multer error: ${err.message}` });
      }
      return res.status(500).json({ error: `Upload failed: ${err.message}` });
    }

    const file = req.file;
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
        const buffer = fs.readFileSync(filePath);
        const unit8Array = new Uint8Array(
          buffer.buffer,
          buffer.byteOffset,
          buffer.byteLength
        );
        const parser = new PDFParse(unit8Array);
        const result = await parser.getText();
        extractedText = result.text;
        await parser.destroy();
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
      return res
        .status(500)
        .json({ error: "Failed to read document content." });
    }
  });
};
