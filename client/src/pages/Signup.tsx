import { SignUp } from "@clerk/clerk-react";
import AuthSideInfo from "../components/AuthSideInfo";

const Signup = () => (
	<div>
		<div className="flex justify-evenly items-center min-h-screen gap-[1%] px-[10%]">
			<div className="flex-1/2 h-auto md:hidden sm:hidden lg:block">
				<AuthSideInfo />
			</div>
			<div className="mr-[9%] mx-2">
				<SignUp
					path="/sign-up"
					routing="path"
					signInUrl="/login"
					forceRedirectUrl="/dashboard"
				/>
			</div>
		</div>
	</div>
);
export default Signup;
