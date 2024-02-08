import { Router } from "express";
import { getOrders, getOrderById } from "../contollers/order.controller";
import { verify } from "../middleware/authMiddleware";
import { ROLES } from "../utils/role";

const orderRoutes = Router();

// path: [/order]
orderRoutes.get(
    "/order",
    verify,
    getOrders
);
orderRoutes.get(
    "/order/:id",
    verify,
    getOrderById
);
// orderRoutes.put(
//     "/order/:id",
//     //   auth.verify,
//     //   auth.hasAnyRole([ROLES.moderator, ROLES.admin]),
//     //   cardProviderValidator.editCardProviderValidation(),
//     //   validate,
//     cardProviderController.editCardProvider
// );
// orderRoutes.delete(
//     "/order/:id",
//     //   auth.verify,
//     //   auth.hasAnyRole([ROLES.moderator, ROLES.admin]),
//     cardProviderController.deleteCardProvider
// );
// orderRoutes.post(
//     "/order",
//     //   auth.verify,
//     //   auth.hasAnyRole([ROLES.moderator, ROLES.admin]),
//     //   cardProviderValidator.createCardProviderValidation(),
//     //   validate,
//     cardProviderController.addCardProvider
// );

export default orderRoutes;
