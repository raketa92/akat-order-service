import { cartNotFound } from "../../messages";
import Cart from "../../models/cart";
import CartItems from "../../models/cartItems";

type Data = {
    productId: string;
    storeId: string;
    userId: string;
    quantity: number;
}

const updateCart = async (data: Data, lang: string): Promise<Cart | null> => {
    try {
        const existingCart = await Cart.findOne({
            where: { userId: data.userId, storeId: data.storeId },
        });
        if (!existingCart) {
            throw ({ reason: cartNotFound(lang), status: 404 })
        }
        await CartItems.update({
            quantity: data.quantity,
        }, { where: { cartId: existingCart.id, productId: data.productId } })

        const updatedCart = await Cart.findOne({
            where: { userId: data.userId }, include: [{
                model: CartItems,
                as: "CartItems"
            }]
        });
        return updatedCart;
    } catch (error) {
        throw error;
    }
}

export default updateCart;