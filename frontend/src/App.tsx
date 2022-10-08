import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/Navbar/Navbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PastesPage from "./pages/PastesPage/PastesPage";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io({
	query: { token: localStorage.token ? localStorage.token : "" },
});

const App: React.FC = () => {
	useEffect(() => {
		socket.on("token", (data) => {
			localStorage.setItem("token", data);
		});
		socket.on("scraping_done", (data) => {
			console.log("SCRAPING DONE");
			console.log(data);
		});
		return () => {
			socket.off("token");
			socket.off("scraping_done");
		};
	}, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/pastes" element={<PastesPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
