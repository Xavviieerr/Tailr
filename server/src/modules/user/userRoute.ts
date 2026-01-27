import express from "express";
import { newUser } from "../user/userController";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";

const router = express.Router();

router.post("/", requireClerkAuth, newUser);
export default router;
