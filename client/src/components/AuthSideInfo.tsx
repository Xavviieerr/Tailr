import Logo from "./Logo";

const AuthSideInfo = () => {
	return (
		<div className="py-8 px-8">
			<div className="absolute top-[5%] left-[5%]">
				<Logo />
			</div>
			<h1
				className="text-center lg:text-[210%] font-[var(--font-jakarta)] 
        mb-[8%] font-bold leading-tight 
         rounded-2xl bg-white/50 shadow-lg backdrop-blur-md py-10 
        "
			>
				Let AI build your next big opportunity — in{" "}
				<span className="underline text-blue-600">3</span> steps. <br />
				<ul className=" text-[60%] my-[10%] text-left ml-[14%]">
					<li>
						<span>
							sign in <span className="text-green-600">✔</span>
						</span>
					</li>
					<li>
						<span>
							describe the role <span className="text-green-600">✔</span>
						</span>
					</li>
					<li>
						<span>
							AI create a tailored CV instantly.{" "}
							<span className="text-green-600">✔</span>
						</span>
					</li>
				</ul>
			</h1>
			<img
				src="/tailr.svg"
				className="absolute right-10 top-[50%] w-[12%] rotate-3 opacity-80"
			/>
			<img
				src="/bot.png"
				className="absolute left-10 top-[20%] w-[12%] rotate-3 opacity-80"
			/>
			<div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/30 blur-3xl rounded-full -z-10"></div>
			<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/30 blur-3xl rounded-full -z-10"></div>
		</div>
	);
};

export default AuthSideInfo;
