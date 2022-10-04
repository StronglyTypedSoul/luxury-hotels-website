import "./config/env";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { json } from "body-parser";
import { dbConnection } from "./config/db";
import apiRouter from "./routes/api";
import { createUser, userConnection } from "./controllers/users";

const PORT = +process.env.PORT;
const app = express();

const server = createServer(app);
const io = new Server(server);

app.use(json());

// Initialization of database and server
dbConnection()
	.then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((err) => console.log(err.message));

// Routes to api endpoints
app.use("/api", apiRouter);

// Handling socket communication
io.on("connection", async (socket: Socket) => {
	const connections = [...io.sockets.sockets].length;
	console.log(`User joined, ${connections} connected`);

	let token = String(socket.handshake.query.token);
	console.log("token", token);
	if (token) {
		// Handling scraper socket logic
		if (token === process.env.SOCKET_SCRAPER_TOKEN) {
			console.log("Scraper socket connected");
			socket.on("new_pastes", (data) => {
				console.log("Received new pastes from scraper", data);
				socket.broadcast.emit("pastes", data);
			});
		}
		// Handling user socket logic
		else {
			//	set user online
			await userConnection(token, true);
			// 	send new pastes to user
		}
	} else {
		token = String(await createUser());
		socket.emit("token", token);
	}
	socket.on("disconnect", async () => {
		await userConnection(String(token), false);
		const connections = [...io.sockets.sockets].length;
		console.log(`User left, ${connections} connected`);
	});
});
