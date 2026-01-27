import { Request } from "express";

export interface AuthRequest extends Request {
	auth?: {
		clerkUserId: string;
		email?: string;
	};
}
