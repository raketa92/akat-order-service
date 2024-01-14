import logger from "../utils/logger";
import { getLang } from "../utils/language";
import { Request, Response, NextFunction } from "express";
import responser from "../utils/responser";
import * as cartService from "../services/cartService";
import { addToCartSchema, updateCartSchema } from "../schemas/cartSchema";
import validate from "../utils/validate";

const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userData?.userId;
        const cart = await cartService.getCartItems({ userId });
        res.json(responser({ data: cart }));
    } catch (e) {
        next({ e });
    }
};

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLang(req.query.lang as string);
        const body = await validate(req.body, addToCartSchema);
        const userId = req.userData?.userId;
        const cart = await cartService.addToCart({
            productId: body.productId,
            storeId: body.storeId,
            userId: userId!,
            quantity: 1,
            shippingType: body.shippingType,
            shippingPriceAmount: body.shippingPriceAmount,
        }, lang);
        res.json(responser({ data: cart }));
    } catch (e) {
        next({ e });
    }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLang(req.query.lang as string);
        const body = await validate(req.body, updateCartSchema);
        const userId = req.userData?.userId;
        const cart = await cartService.updateCart({
            productId: body.productId,
            storeId: body.storeId,
            userId: userId!,
            quantity: body.quantity,
        }, lang);
        res.json(responser({ data: cart }));
    } catch (e) {
        next({ e })
    }
}

const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLang(req.query.lang as string);
        const {productId, cartId} = req.params;
        const cart = await cartService.deleteCartItem({
            productId,
            cartId,
        }, lang);
        res.json(responser({ data: cart }));
    } catch (e) {
        next({ e })
    }
}


export { getCartItems, addToCart, updateCart, deleteCartItem }