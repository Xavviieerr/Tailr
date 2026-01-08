import express from "express";
import { aiGenerateCv } from "../controllers/aiController";
import { extractCvText } from "../middleware/previousCvParser";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.post("/generate", extractCvText, aiGenerateCv);

export default router;
