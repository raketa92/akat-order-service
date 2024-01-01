import { isJson } from "../../../utils/checkJson";
import logger from "../../../utils/logger";
import { consumeEvent } from "../rabbitMq";
import { TOPICS } from "../topics";

export const consumePaymentEvent = () => {
    consumeEvent(
        {
            topic: TOPICS.payment.topicName,
            event: TOPICS.payment.events.status_updated,
        },
        async (data) => {
            try {
                if (data.msg) {
                    if (!isJson(data.msg.content.toString())) {
                        data.channel.ack(data.msg);
                        throw "Invalid JSON data";
                    }
    
                    // update order status due to payment status changed
                    logger.info(`Languages reassigned`);
                    data.channel.ack(data.msg);
                }
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
    );
}