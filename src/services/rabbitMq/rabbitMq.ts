import amqp, { Channel, ConsumeMessage, credentials } from "amqplib";
import { appConfig } from "../../config/appConfig";
import logger from "../../utils/logger";
import { consumePaymentEvent } from "./consumers/paymentConsume";

// const credentials = require("amqplib/lib/credentials");
// const logger = require("../../utils/logger");
const rabbitServicePath = appConfig.rabbitHost!;

interface IPublishTopic {
    topic: string; 
    event: string; 
    msg: string;
};

interface IConsumeEvent {
    topic: string; 
    event: string;
};

interface IConsumeDetail {
    msg: ConsumeMessage | null;
    channel: Channel;
}
interface IConsumeCallback {
    (data: IConsumeDetail): void
}

let channel: Channel;
async function addChannel() {
    try {
        const rabbitUser = "rabbit";
        const rabbitPassword = "6.b%RGCvAjP}[&zT";
        const options = { credentials: credentials.plain(rabbitUser, rabbitPassword) };
        const connection = await amqp.connect(rabbitServicePath, options);
        channel = await connection.createChannel();
    } catch (e) {
        await Promise.reject(e);
    }
}

async function publishTopic({ topic, event, msg }: IPublishTopic) {
    try {
        console.log(`Publishing ${event} event to ${topic} topic`);
        logger.info(`Publishing ${event} event to ${topic} topic`);
        let ch = channel;
        await ch.assertExchange(topic, "topic", { durable: true });
        ch.publish(topic, event, Buffer.from(msg), { persistent: true });
        console.log({ event, msg });
    } catch (e) {
        await Promise.reject(e);
    }
}

async function consumeEvent({ topic, event }: IConsumeEvent, fn: IConsumeCallback) {
    try {
        console.log(`Consuming ${event} event of ${topic} topic`);
        logger.info(`Consuming ${event} event of ${topic} topic`);
        let ch = channel;
        await ch.assertExchange(topic, "topic", { durable: true });
        const queueName = "order." + event;
        const q = await ch.assertQueue(queueName, { durable: true });
        await ch.bindQueue(q.queue, topic, event);
        await ch.consume(q.queue, (msg) => {
            fn({ msg, channel: ch });
        });
    } catch (e) {
        await Promise.reject(e);
    }
}

async function startConsuming() {
    try {
        await addChannel();
        // ------------------Consumers--------------------
        consumePaymentEvent();
    } catch (e) {
        await Promise.reject(e);
    }
}

export { publishTopic, addChannel, consumeEvent, startConsuming };
