import { orderNotFound } from "../../messages";
import { Order } from "../../models";

const getById = async (orderId: string, lang: string): Promise<Order> => {
        const condition = { orderId };

        const order = await Order.findOne({
            order: [["id", "DESC"]],
            where: condition,
        });

        if (!order) {
            throw ({ reason: orderNotFound(lang), status: 404 })
        }

        return order;
};

export default getById;
