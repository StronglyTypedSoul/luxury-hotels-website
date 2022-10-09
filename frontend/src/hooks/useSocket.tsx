import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const useSocket = () => {
	const context = useContext(SocketContext);
	if (context) {
		return context;
	} else {
		throw new Error("useSocket must be within SocketProvider");
	}
};

export default useSocket;
