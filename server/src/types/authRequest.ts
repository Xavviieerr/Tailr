import { Request } from "express";

export interface AuthRequest<TBody = any> extends Request<{}, any, TBody> {
	auth?: {
		clerkUserId: string;
		email?: string;
	};
}
