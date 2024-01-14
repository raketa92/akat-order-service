import { cartNotFound } from "../../messages";
import Cart from "../../models/cart";
import CartItems from "../../models/cartItems";

type Data = {
    productId: string;
    cartId: string;
}

const deleteCartItem = async (data: Data, lang: string): Promise<Cart | null> => {
    try {
        const existingCart = await Cart.findOne({
            where: { id: data.cartId },
            include: [{
                model: CartItems,
                as: "CartItems"
            }]
        });
        if (!existingCart) {
            throw ({ reason: cartNotFound(lang), status: 404 })
        }
        await CartItems.destroy({ where: { productId: data.productId, cartId: data.cartId } });
        if (existingCart.CartItems.length < 2) {
            return null;
        }
        const updatedCart = await Cart.findOne({
            where: { id: data.cartId }, include: [{
                model: CartItems,
                as: "CartItems"
            }]
        });
        return updatedCart;
    } catch (error) {
        throw error;
    }
}

export default deleteCartItem;