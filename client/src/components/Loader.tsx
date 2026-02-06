import React from "react";

const Loader = () => {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-white/30">
			<div className="relative flex items-center justify-center">
				<div className="absolute inset-0 blur-3xl bg-[#212774]/20 rounded-full animate-pulse" />

				<svg width="80" height="80" viewBox="0 0 56 56" className="relative">
					<style>
						{`
              .hex {
                fill: #212774;
                animation: hex-pulse 1.2s ease-in-out infinite;
              }
              @keyframes hex-pulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.15); opacity: 1; }
              }
            `}
					</style>
					{/* Top Row */}
					<path
						className="hex"
						d="M28 2L37.5 7.5V18.5L28 24L18.5 18.5V7.5L28 2Z"
						style={{ animationDelay: "0s", transformOrigin: "28px 13px" }}
					/>
					{/* Middle Right */}
					<path
						className="hex"
						d="M44.5 12L54 17.5V28.5L44.5 34L35 28.5V17.5L44.5 12Z"
						style={{ animationDelay: "0.2s", transformOrigin: "44.5px 23px" }}
					/>
					{/* Bottom Right */}
					<path
						className="hex"
						d="M44.5 34L54 39.5V50.5L44.5 56L35 50.5V39.5L44.5 34Z"
						style={{ animationDelay: "0.4s", transformOrigin: "44.5px 45px" }}
					/>
					{/* Bottom Row */}
					<path
						className="hex"
						d="M28 44L37.5 49.5V60.5L28 66L18.5 60.5V49.5L28 44Z"
						style={{ animationDelay: "0.6s", transformOrigin: "28px 55px" }}
					/>
					{/* Bottom Left */}
					<path
						className="hex"
						d="M11.5 34L21 39.5V50.5L11.5 56L2 50.5V39.5L11.5 34Z"
						style={{ animationDelay: "0.8s", transformOrigin: "11.5px 45px" }}
					/>
					{/* Middle Left */}
					<path
						className="hex"
						d="M11.5 12L21 17.5V28.5L11.5 34L2 28.5V17.5L11.5 12Z"
						style={{ animationDelay: "1s", transformOrigin: "11.5px 23px" }}
					/>
				</svg>
			</div>
		</div>
	);
};

export default Loader;
