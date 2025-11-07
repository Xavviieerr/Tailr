import express from "express";
import { aiGeneratedCv } from "../controllers/aiController";
import { extractCvText } from "../middleware/previousCvParser";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.post("/generate", extractCvText, aiGeneratedCv);

export default router;
