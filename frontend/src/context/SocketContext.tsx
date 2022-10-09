import { useContext, createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io({
	query: { token: localStorage.token ? localStorage.token : "" },
});

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (context) {
		return context;
	} else {
		throw new Error("useSocket must be within SocketProvider");
	}
};

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
