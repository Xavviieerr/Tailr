import express from "express";
import { allUserCv } from "../controllers/cvController";

const router = express.Router();

router.get("/", allUserCv);

export default router;
