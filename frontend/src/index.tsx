import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<></>} />
				<Route path="/pastes" element={<></>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	</>
);
