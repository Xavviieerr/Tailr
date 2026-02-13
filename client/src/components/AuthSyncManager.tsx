import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { syncUserWithBackend } from "../store/userSlice";
import Loader from "./Loader";

export const AuthSyncManager: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isLoaded, isSignedIn, user } = useUser();
	const { getToken } = useAuth();
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const performSync = async () => {
			if (isLoaded && isSignedIn && user) {
				const token = await getToken();
				if (token) {
					dispatch(
						syncUserWithBackend({
							token,
							profile: {
								firstName: user.firstName || "",
								lastName: user.lastName || "",
								email: user.emailAddresses[0].emailAddress,
							},
						}),
					);
				}
			}
		};

		performSync();
	}, [isLoaded, isSignedIn, user, dispatch, getToken]);

	if (!isLoaded || loading) {
		return <Loader />;
	}

	return <>{children}</>;
};
