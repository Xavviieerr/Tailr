import express from "express";
import { getMyCvs, createCV } from "../cv/cvController";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";

const router = express.Router();

router.post("/", requireClerkAuth, createCV);
router.get("/", requireClerkAuth, getMyCvs);

// router.post("/", requireClerkAuth, createCv);
// router.get("/", requireClerkAuth, getMyCvs);
// router.get("/:id", requireClerkAuth, getCvById);
// router.patch("/:id", requireClerkAuth, updateCv);
// router.delete("/:id", requireClerkAuth, deleteCv);

export default router;

// Creating CV records

// Updating tailored versions

// Versioning CVs (original vs tailored)

// Linking CVs to users

// Fetching CV history
