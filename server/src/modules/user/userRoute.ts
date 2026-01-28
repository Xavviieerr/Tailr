import express from "express";
import { newUser, getMe } from "../user/userController";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";

const router = express.Router();

router.post("/newUser", requireClerkAuth, newUser);
router.get("/me", requireClerkAuth, getMe);

export default router;
