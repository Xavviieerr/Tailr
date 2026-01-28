import { Request, Response } from "express";
import { AuthRequest } from "../../types/authRequest";

interface NewUserBody {
	email: string;
	firstName?: string;
	lastName?: string;
}

export const newUser = (req: AuthRequest<NewUserBody>, res: Response) => {
	console.log(req.auth);
	console.log("headers:", req.headers["content-type"]);
	console.log(req.body);
	res.status(200).json({ message: "Working" });

	// const user = await userService.syncUser({
	// 	clerkUserId: req.auth.userId,
	// 	email: req.auth.email,
	// });

	//res.status(200).json(user);
};

// export const getMe = async (req, res) => {
// 	const user = await userService.getUserByClerkId(req.auth.userId);

// 	res.status(200).json(user);
// };
