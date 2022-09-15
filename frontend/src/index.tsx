import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/Navbar/Navbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
	<>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/pastes" element={<></>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	</>
);
