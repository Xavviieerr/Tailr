import express from "express";
import { aiGeneratedCv } from "../controllers/aiController";

const router = express.Router();

router.get("/generate", aiGeneratedCv);

export default router;
