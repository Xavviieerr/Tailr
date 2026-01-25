// User Service

// Ensure user exists (sync)
// Retrieve user profile
// Expose plan & limits
// Act as gatekeeper for other modules

// import * as userRepo from "./userRepository";

// export const syncUser = async ({ clerkUserId, email }) => {
// 	const existingUser = await userRepo.findByClerkId(clerkUserId);

// 	if (existingUser) {
// 		return existingUser;
// 	}

// 	// First-time user
// 	return userRepo.createUser({
// 		clerkUserId,
// 		email,
// 		plan: "FREE",
// 	});
// };

// export const getUserByClerkId = async (clerkUserId: string) => {
// 	const user = await userRepo.findByClerkId(clerkUserId);

// 	if (!user) {
// 		throw new Error("User not found");
// 	}

// 	return user;
// };
