import "./config/config";
import path from "path";
import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { json } from "body-parser";
import apiRouter from "./routes/api";
import * as db from "./database/db";
import { createServer } from "http";

const PORT = +process.env.PORT;
const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
	const connections = [...io.sockets.sockets].length;
	console.log(`User joined, ${connections} connected`);
	socket.on("disconnect", () => {
		const connections = [...io.sockets.sockets].length;
		console.log(`User left, ${connections} connected`);
	});
});

app.use(json());

// Initialization of database and server
db.connect()
	.then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((err) => console.log(err.message));

// Routes to api endpoints
app.use("/api", apiRouter);

// Serves static files if in production mode
if (process.env.NODE_ENV === "production") {
	const buildDirectory = path.join(__dirname, "../build");

	app.use(express.static(buildDirectory));

	app.get("*", (req: Request, res: Response) => {
		res.sendFile(path.join(buildDirectory, "index.html"));
	});
}
