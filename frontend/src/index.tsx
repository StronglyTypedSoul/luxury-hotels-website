import ReactDOM from "react-dom/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import App from "./App";
import "./index.scss";
import SocketProvider from "./context/SocketContext";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
	<SocketProvider>
		<App />
	</SocketProvider>
);
