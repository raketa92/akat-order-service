import { Order } from "../../models";

type Filters = {
    orderId?: string;
};

const getAllByFilters = async (filters: Filters): Promise<Order[]> => {
    try {
        const { orderId } = filters;
        let condition = {};
        if (orderId) condition = { orderId };
    
        const orders = await Order.findAll({
            order: [["id", "DESC"]],
            where: condition,
        });
    
        return orders;
    } catch (e) {
        throw e;
    }
};

export default getAllByFilters;
