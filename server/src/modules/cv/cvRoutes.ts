import express from "express";
import { allUserCv, createCV } from "../cv/cvController";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";

const router = express.Router();

router.post("/create", requireClerkAuth, createCV);
// router.get("/test-all", getAllCVs);
export default router;

// Creating CV records

// Updating tailored versions

// Versioning CVs (original vs tailored)

// Linking CVs to users

// Fetching CV history
