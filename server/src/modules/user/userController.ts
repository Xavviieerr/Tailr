import { Request, Response } from "express";

export const newUser = (req: Request, res: Response) => {
	res.status(200).json({ message: "energy is different" });
};

// export const syncUser = async (req, res) => {
// 	const user = await userService.syncUser({
// 		clerkUserId: req.auth.userId,
// 		email: req.auth.email,
// 	});

// 	res.status(200).json(user);
// };

// export const getMe = async (req, res) => {
// 	const user = await userService.getUserByClerkId(req.auth.userId);

// 	res.status(200).json(user);
// };
