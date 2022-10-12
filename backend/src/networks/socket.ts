import { Server, Socket } from "socket.io";
import { getNewPastesForUser, userConnection, createUser, getUserById } from "../controllers/users";

export async function initSocketConnectionListener(io: Server): Promise<void> {
	io.on("connection", async (socket: Socket) => {
		let token = socket.handshake.query.token ? String(socket.handshake.query.token) : undefined;
		const connections = [...io.sockets.sockets].length;
		console.log(`User joined, ${connections} connected`);
		console.log(token ? `Token: ${token}` : "No token");

		if (token) {
			const user = await getUserById(token);
			if (user) {
				// Sending the user all pastes that were scraped after user's last time online
				const newPastes = await getNewPastesForUser(user);
				if (newPastes.length > 0) socket.emit("new_pastes", newPastes);
				// Setting user online
				await userConnection(token, true);
			} else {
				// If the user id is invalid, creating a user and sending the client a new token
				token = String(await createUser());
				socket.emit("token", token);
			}
		} else {
			// Creating a user and sending the client a token
			token = String(await createUser());
			socket.emit("token", token);
		}
		// Setting user offline
		socket.on("disconnect", () => socketUserDisconnect(io, token));
	});
}

// Setting user offline
async function socketUserDisconnect(io: Server, token: string): Promise<void> {
	await userConnection(token, false);
	const connections = [...io.sockets.sockets].length;
	console.log(`User left, ${connections} connected`);
}
