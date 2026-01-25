import express from "express";
import {
	allUserCv,
	createTestCV,
	// getAllCVs,
} from "../cv/cvController";

const router = express.Router();

router.get("/", allUserCv);
router.post("/test-create", createTestCV);
// router.get("/test-all", getAllCVs);
export default router;
