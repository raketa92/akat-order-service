import { Order } from "../../models";
import Cart from "../../models/cart";
import CartItems from "../../models/cartItems";

type Filters = {
    anonymous_token?: string;
    userId?: string;
    id?: number;
};

const getCartDataByFilters = async (filters: Filters): Promise<Cart | null> => {
    try {
        const { anonymous_token, userId, id } = filters;
        let condition = {};
        if (anonymous_token) condition = { anonymous_token };
        if (userId) condition = { ...condition, userId };
        if (id) condition = { ...condition, id };
    
        const cart = await Cart.findOne({
            order: [["id", "DESC"]],
            where: condition,
            include: {
                model: CartItems,
                as: "CartItems"
            }
        });
    
        return cart;
    } catch (e) {
        throw e;
    }
};

export default getCartDataByFilters;
