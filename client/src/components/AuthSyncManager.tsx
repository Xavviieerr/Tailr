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
	const { data, loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const performSync = async () => {
			if (isLoaded && isSignedIn && user && !data && !loading) {
				const token = await getToken();
				if (token) {
					dispatch(
						syncUserWithBackend({
							token,
							profile: {
								firstname: user.firstName || "",
								lastname: user.lastName || "",
								email: user.emailAddresses[0].emailAddress,
							},
						}),
					);
				}
			}
		};

		performSync();
	}, [isLoaded, isSignedIn, user, dispatch, getToken, data, loading]);

	if (!isLoaded || loading) {
		return <Loader />;
	}

	return <>{children}</>;
};
