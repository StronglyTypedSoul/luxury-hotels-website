import os
import pika
import json

# Publishes new pastes into the pastes queue (RabbitMQ)
def publish_pastes(pastes):
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST")))
        channel = connection.channel()
        queue = os.getenv("RABBITMQ_PASTES_QUEUE")
        channel.queue_declare(queue, True)
        channel.basic_publish(
            exchange="",
            routing_key=queue,
            body=json.dumps(pastes),
            properties=pika.BasicProperties(delivery_mode=2),
        )
        connection.close()
    except:
        print("Failed to publish pastes via RabbitMQ")
