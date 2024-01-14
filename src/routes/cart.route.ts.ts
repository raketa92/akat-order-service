import { Router } from "express";
import { verify } from "../middleware/authMiddleware";
import {getRoles} from "../utils/role";
import { addToCart, deleteCartItem, getCartItems, updateCart } from "../contollers/cart.controller";


const ROLES = getRoles();

const cartRoutes = Router();

cartRoutes.get(
    "/cart",
    verify,
    getCartItems
);

cartRoutes.put(
    "/cart/update",
    verify,
    updateCart
);
cartRoutes.delete(
    "/cart/:cartId/:productId",
    verify,
    deleteCartItem
);
cartRoutes.post(
    "/cart",
    verify,
    addToCart
);

export default cartRoutes;
