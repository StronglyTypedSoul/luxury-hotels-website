import { Channel } from "amqplib";
import { Server } from "socket.io";

export async function initRmqConsumer(channel: Channel, io: Server): Promise<void> {
	const queue = process.env.RABBITMQ_PASTES_QUEUE;
	await channel.assertQueue(queue);
	channel.consume(queue, (msg) => {
		if (msg !== null) {
			const pastes = JSON.parse(msg.content.toString());
			console.log("Received new pastes from scraper:", pastes);
			io.emit("scraping_done", pastes);
			channel.ack(msg);
		}
	});
}
