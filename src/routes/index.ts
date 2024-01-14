import logger from "../utils/logger";
import responser from "../utils/responser";
import {Router, Request, Response, NextFunction} from "express";
import { getLang } from "../utils/language";
import orderRoutes from "./order.route";
import cartRoutes from "./cart.route.ts";
import { urlNotFound } from "../messages";

const router = Router();
interface ICommonError {
    reason: string;
    status?: number;
    error?: string;
    data?: string | string[];
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json("order service ok");
  } catch (e) {
    next({ e });
  }
});

router.use("/", orderRoutes);
router.use("/", cartRoutes);

router.use((req: Request, res: Response, next: NextFunction) => {
  const lang = getLang(req.query.lang as string);
  const e: ICommonError = { reason: urlNotFound(lang) };
  e.status = 404;
  next({ e });
});

router.use((e: ICommonError, req: Request, res: Response, next: NextFunction) => {
  console.log(JSON.stringify(e));
  logger.error(`${JSON.stringify(e)}`);
  res.status(e.status || 500);
  res.json(
    responser({
      data: e.data,
      message: e.reason || "uncaught error/exception --> order-service",
      error: e.error,
    })
  );
});

export default router;
