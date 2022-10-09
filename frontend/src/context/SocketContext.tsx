import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io({
	query: { token: localStorage.token ? localStorage.token : "" },
});

export const SocketContext = createContext<Socket | undefined>(undefined);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
