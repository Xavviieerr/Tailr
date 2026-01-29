import { SignIn } from "@clerk/clerk-react";
import AuthSideInfo from "../components/AuthSideInfo";

const Login = () => (
	<div>
		<div className="flex justify-evenly items-center min-h-screen gap-[6%]  px-[10%]">
			<div className="flex-1/2 md:hidden sm:hidden lg:block h-auto">
				<AuthSideInfo />
			</div>
			<div className="mx-5">
				<SignIn path="/login" routing="path" signUpUrl="/sign-up" />
			</div>
		</div>
	</div>
);
export default Login;
