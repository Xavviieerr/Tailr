// src/middleware/devAuth.ts
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/authRequest";

export const devAuth = (
	req: AuthRequest,
	_res: Response,
	next: NextFunction,
) => {
	console.log("In devAuth middleware");
	req.auth = {
		clerkUserId: "user_dev_123",
	};

	return next();
};
