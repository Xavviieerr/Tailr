import AppRoutes from "./routes/AppRoutes";
import { AuthSyncManager } from "./components/AuthSyncManager";
import { StrictMode } from "react";
import ResponsiveNotice from "./components/ResponsiveNotice";

function App() {
	return (
		<StrictMode>
			<ResponsiveNotice />
			<AuthSyncManager>
				<AppRoutes />
			</AuthSyncManager>
		</StrictMode>
	);
}

export default App;
