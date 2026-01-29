import { prisma } from "../../lib/prisma";
import { UserCreateInput } from "../../../generated/prisma/models/User";

export const findByClerkId = async (clerkId: string) => {
	return prisma.user.findUnique({
		where: { clerkId },
	});
};

export const createUser = async (data: UserCreateInput) => {
	return prisma.user.create({ data });
};
