import { Server, Socket } from "socket.io";
import { getNewPastesForUser, userConnection, createUser } from "../controllers/users";

export async function initSocketConnectionListener(io: Server): Promise<void> {
	io.on("connection", async (socket: Socket) => {
		let token = socket.handshake.query.token ? String(socket.handshake.query.token) : undefined;
		const connections = [...io.sockets.sockets].length;
		console.log(`User joined, ${connections} connected`);
		console.log(token ? `Token: ${token}` : "No token");

		if (token) {
			// Sending the user all pastes that were scraped after user's last time online
			const newPastes = await getNewPastesForUser(token);
			socket.emit("new_pastes", newPastes);
			// Setting user online
			await userConnection(token, true);
		} else {
			token = String(await createUser());
			socket.emit("token", token);
		}
		socket.on("disconnect", () => socketDisconnectListener(io, token));
	});
}

// Setting user offline
async function socketDisconnectListener(io: Server, token: string): Promise<void> {
	await userConnection(token, false);
	const connections = [...io.sockets.sockets].length;
	console.log(`User left, ${connections} connected`);
}
