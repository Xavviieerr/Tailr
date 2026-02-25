import { prisma } from "../../lib/prisma";
import type { UserCreateInput } from "../../../generated/prisma/models/User";

export const findByClerkId = async (clerkId: string) => {
	try {
		return await prisma.user.findUnique({
			where: { clerkId },
		});
	} catch (error) {
		console.error("Prisma query failed:", error);
		return null;
	}
};

export const createUser = async (data: UserCreateInput) => {
	return prisma.user.create({ data });
};
