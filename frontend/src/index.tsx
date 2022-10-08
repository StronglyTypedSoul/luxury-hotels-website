import ReactDOM from "react-dom/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import App from "./App";
import io from "socket.io-client";
import "./index.scss";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
