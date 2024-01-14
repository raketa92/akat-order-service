import Cart from "../../models/cart";
import CartItems from "../../models/cartItems";
import { sequelize } from "../../models/connect";

type Data = {
    productId: string;
    storeId: string;
    userId: string;
    quantity: number;
    shippingType?: string;
    shippingPriceAmount?: number;
}


const addToCart = async (data: Data, lang: string): Promise<Cart | null> => {
    const transaction = await sequelize.transaction();
    try {
        const existingCart = await Cart.findOne({
            where: { userId: data.userId, storeId: data.storeId }, include: [{
                model: CartItems,
                as: "CartItems"
            }]
        });
        if (existingCart) {
            const existingCartItem = existingCart.CartItems.find((item => item.productId === data.productId))
            if (existingCartItem) {
                return existingCart;
            }
            await CartItems.create({
                productId: data.productId,
                quantity: data.quantity,
                shippingType: data.shippingType,
                shippingPriceAmount: data.shippingPriceAmount,
                currency: "TMT"
            }, {transaction});
        } else {
            await Cart.create({ ...data, currency: "TMT" }, { transaction });
            await CartItems.create({
                productId: data.productId,
                quantity: data.quantity,
                shippingType: data.shippingType,
                shippingPriceAmount: data.shippingPriceAmount,
                currency: "TMT"
            }, {transaction});
        }

        await transaction.commit();

        const cart = await Cart.findOne({
            where: { userId: data.userId }, include: [{
                model: CartItems,
                as: "CartItems"
            }]
        });

        return cart;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export default addToCart;
