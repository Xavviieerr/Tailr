import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 100,
	message: { message: "Too many requests from this IP, slow down." },
});
