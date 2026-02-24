import React from "react";

const ResponsiveNotice: React.FC = () => {
	return (
		// visible on small and medium screens, hidden on large and above
		<div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-6">
			<div className="max-w-lg mx-4 bg-white rounded-lg shadow-lg border border-gray-200 p-6 text-center">
				<h2 className="text-xl font-bold text-gray-800 mb-3">Heads up</h2>
				<p className="text-gray-700 mb-4">
					I built this project not focusing on desktop layouts — responsiveness
					for small and medium screens wasn't a priority. I'm sorry for the
					inconvenience. Please use a desktop or larger screen for the best
					experience.
				</p>
				<p className="text-sm text-gray-500">Thank you for understanding.</p>
			</div>
		</div>
	);
};

export default ResponsiveNotice;
