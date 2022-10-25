import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/Navbar/Navbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PastesPage from "./pages/PastesPage/PastesPage";
import { useEffect } from "react";
import useSocket from "./hooks/useSocket";
import PersonalPage from "./pages/PersonalPage/PersonalPage";

const App: React.FC = () => {
	const socket = useSocket();

	useEffect(() => {
		socket.on("token", (data) => {
			localStorage.setItem("token", data);
		});
		return () => {
			socket.off("token");
		};
	}, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/pastes" element={<PastesPage />} />
					<Route path="/personal" element={<PersonalPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
