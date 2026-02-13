import express from "express";
import { aiGenerateCv } from "../ai/aiController";
import { extractCvText } from "../../middleware/previousCvParser";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";
import { aiRateLimiter } from "../../middleware/aiRateLimiter";

const router = express.Router();

router.post(
	"/generate",
	requireClerkAuth,
	aiRateLimiter,
	extractCvText,
	aiGenerateCv,
);
export default router;
