import "./config/env";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { json } from "body-parser";
import { dbConnection, rabbitmqConnection } from "./config/connections";
import apiRouter from "./routes/api";
import { initSocketConnectionListener } from "./networks/socket";
import { initRmqConsumer } from "./networks/rabbitmq";

const PORT = +process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(json());

// Routes to api endpoints
app.use("/api", apiRouter);

// Initialization of database, socket and server
(async (): Promise<void> => {
	try {
		await dbConnection();
		console.log("Connected to database");
		await initSocketConnectionListener(io);
		console.log("Initialized socket");
		server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.log(err.message);
	}
})();

// Initialization of RabbitMQ
setTimeout(async () => {
	rabbitmqConnection()
		.then(async (channel) => {
			await initRmqConsumer(channel, io);
			console.log("Connected to rabbitmq");
		})
		.catch((err) => {
			console.log("Failed to connect to RabbitMQ");
			console.log(err.message);
		});
}, 60000);
