const amqp = require("amqplib");
const queue = "tasks";

connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    channel.sendToQueue(
      "jobs",
      Buffer.from(JSON.stringify({ number: process.argv[2] }))
    );
    console.log("Job sent successfully");
  } catch (error) {
    console.error(error);
  }
}
