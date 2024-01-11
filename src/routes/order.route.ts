import { Router } from "express";
// const auth = require("../middleware/authMiddleware");

// const { validate, cardProviderValidator } = require("../middleware/validators");

// const cardProviderController = require("../controllers/cardProviderController");
import { getOrders, getOrderById } from "../contollers/order.controller";

// const ROLES = require("../../utils/role").getRoles();

const orderRoutes = Router();

// path: [/order]
orderRoutes.get(
    "/order",
    // auth.verify, 
    getOrders
);
orderRoutes.get(
    "/order/:id",
    //   auth.verify,
    //   auth.hasAnyRole([ROLES.moderator, ROLES.admin, ROLES.service_internal]),
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
