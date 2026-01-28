import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { AuthRequest } from "../types/authRequest";

export const requireClerkAuth = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	console.log("In requireClerkAuth middleware");
	if (process.env.NODE_ENV === "development" && req.auth?.clerkUserId) {
		console.log(req.auth?.clerkUserId);
		return next();
	}

	const auth = getAuth(req);
	const userId = auth.userId;

	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	console.log("user Authorized!");
	req.auth = {
		clerkUserId: userId,
	};

	return next();
};
