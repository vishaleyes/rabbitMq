const amqp = require("amqplib");
const queue = "tasks";

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      let input = JSON.parse(message.content.toString());
      console.log("message", input.number);
      if (message == 7) {
        channel.ack(message);
      }
    });

    console.log("Waiting for messages...");
  } catch (error) {
    console.error(error);
  }
}
