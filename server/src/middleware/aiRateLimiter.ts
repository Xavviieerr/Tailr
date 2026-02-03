import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { AuthRequest } from "../types/authRequest";

export const aiRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	message: { message: "Too many requests, please wait." },

	keyGenerator: (req: AuthRequest, res) => {
		console.log("Generating key for rate limiter", req.auth, req.ip);
		return req.auth?.clerkUserId || ipKeyGenerator(req.ip!);
	},
});
