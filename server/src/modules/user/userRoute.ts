import express from "express";
import { newUser } from "../user/userController";

const router = express.Router();

router.post("/", newUser);

export default router;
