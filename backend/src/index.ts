import "./config/config";
import express from "express";
import { Server, Socket } from "socket.io";
import { json } from "body-parser";
import apiRouter from "./routes/api";
import * as db from "./database/db";
import { createServer } from "http";

const PORT = +process.env.PORT;
const app = express();

const server = createServer(app);
const io = new Server(server);

app.use(json());

// Initialization of database and server
db.connect()
	.then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((err) => console.log(err.message));

// Routes to api endpoints
app.use("/api", apiRouter);

// Handling socket communication
io.on("connection", (socket: Socket) => {
	const connections = [...io.sockets.sockets].length;
	console.log(`User joined, ${connections} connected`);

	const token = socket.handshake.query.token;
	if (token) {
		// Handling scraper socket logic
		if (token === process.env.SOCKET_SCRAPER_TOKEN) {
			socket.on("new_pastes", (data) => {
				console.log("Received new pastes from scraper", data);
				socket.broadcast.emit("pastes", data);
			});
			// Handling user socket logic
		} else {
			//	set user online
			// 	send new pastes to user
		}
	} else {
		// Creating a new user and sending his token
	}
	socket.on("disconnect", () => {
		const connections = [...io.sockets.sockets].length;
		console.log(`User left, ${connections} connected`);
	});
});
