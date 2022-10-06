import amqp, { Channel } from "amqplib";
import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}

// Connects to the rabbitmq server
export async function rabbitmqConnection(): Promise<Channel> {
	const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
	const channel = await connection.createChannel();
	return channel;
}
