import AppRoutes from "./routes/AppRoutes";
import { AuthSyncManager } from "./components/AuthSyncManager";
import { StrictMode } from "react";

function App() {
	return (
		<StrictMode>
			<AuthSyncManager>
				<AppRoutes />
			</AuthSyncManager>
		</StrictMode>
	);
}

export default App;
