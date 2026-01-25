import { Request, Response } from "express";

export const newUser = (req: Request, res: Response) => {
	res.status(200).json({ message: "energy is different" });
};
