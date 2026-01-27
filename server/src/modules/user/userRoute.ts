import express from "express";
import { newUser } from "../user/userController";
import { requireClerkAuth } from "../../middleware/clerkAuthMiddleware";

const router = express.Router();

router.post("/newUser", newUser);
export default router;
