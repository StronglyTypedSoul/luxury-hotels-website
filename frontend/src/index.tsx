import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/Navbar/Navbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PastesPage from "./pages/PastesPage/PastesPage";
import PastesProvider from "./context/PastesContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
	<>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route
					path="/pastes"
					element={
						<PastesProvider>
							<PastesPage />
						</PastesProvider>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	</>
);
