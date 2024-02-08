import logger from "../utils/logger";
import { getLang } from "../utils/language";
// const { MESSAGES } = require("../messages");
import { Request, Response, NextFunction } from "express";
import { sequelize } from "../models/connect";
import responser from "../utils/responser";
import * as orderService from "../services/orderService";
import { createOrderSchema } from "../schemas/orderSchema";
import validate from "../utils/validate";
import { userIdEmpty } from "../messages";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getAllByFilters({});
        res.json(responser({ data: orders }));
    } catch (e) {
        next({ e });
    }
};

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLang(req.query.lang as string);
        const orderId = req.params.id;
        const orders = await orderService.getById(orderId, lang);
        res.json(responser({ data: orders }));
    } catch (e) {
        next({ e });
    }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLang(req.query.lang as string);
        const body = await validate(req.body, createOrderSchema);
        const order = await orderService.create(body, lang);
        res.json(responser({ data: order }));
    } catch (e) {
        next({ e });
    }
};


export { getOrders, getOrderById, createOrder }