import * as userRepo from "./userRepository";

//checsk if user exists by clerk id
export const findUserByClerkId = async (clerkUserId: string) => {
	return userRepo.findByClerkId(clerkUserId);
};

//throws error if user does not exist
export const requireUserByClerkId = async (clerkUserId: string) => {
	const user = await userRepo.findByClerkId(clerkUserId);

	if (!user) {
		throw new Error("User does not exist");
	}

	return user;
};

interface NewUserInput {
	clerkUserId: string;
	email: string;
	firstName: string;
	lastName: string;
}

export const syncUser = async ({
	clerkUserId,
	email,
	firstName,
	lastName,
}: NewUserInput) => {
	const existingUser = await userRepo.findByClerkId(clerkUserId);

	if (existingUser) {
		return existingUser;
	}

	return userRepo.createUser({
		clerkId: clerkUserId,
		email,
		firstName,
		lastName,
		updatedAt: new Date(),
	});
};

export const getUserByClerkId = async (clerkUserId: string) => {
	console.log("Getting user by clerk ID:", clerkUserId);
	const user = await userRepo.findByClerkId(clerkUserId);

	if (!user) {
		throw new Error("User not found");
	}

	return user;
};
