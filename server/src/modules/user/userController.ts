import { Request, Response } from "express";
import { AuthRequest } from "../../types/authRequest";
import * as userService from "./userService";

interface NewUserBody {
	email: string;
	firstName: string;
	lastName: string;
}

export const newUser = async (req: AuthRequest<NewUserBody>, res: Response) => {
	console.log(req.auth);
	console.log("headers:", req.headers["content-type"]);
	console.log(req.body);

	const { firstName, lastName, email } = req.body;

	if (!firstName || !lastName) {
		return res
			.status(400)
			.json({ message: "firstName and lastName are required" });
	}

	const user = await userService.syncUser({
		clerkUserId: req.auth!.clerkUserId,
		email,
		firstName,
		lastName,
	});

	return res.status(200).json(user);
};

// export const getMe = async (req, res) => {
// 	const user = await userService.getUserByClerkId(req.auth.userId);

// 	res.status(200).json(user);
// };
