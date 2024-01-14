import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwtService";
import { UserData } from "../types/global";
import responser from "../utils/responser";

const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req.header("Authorization") || "";
        const token = bearer.split(" ")[1];
        const valid = verifyToken(token);
        req.userData = valid as UserData;
        return valid ? next() : res.status(401).json(responser({ message: "Unauthorized" }));
    } catch (e) {
        await Promise.reject(e);
    }
};

const hasRole = (role: string) => {
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.userData) await Promise.reject();
            const user = req.userData;
            const foundRole = user?.roles?.some((s) => s === role);
            foundRole ? next() : await Promise.reject();
        } catch (e) {
            return res.status(403).json(responser({ message: "Access Denied" }));
        }
    };
};

const hasAnyRole = (roleIds: number[]) => {
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.userData) await Promise.reject();
            const user = req.userData;
            const foundAnyRole = roleIds?.some((s) => user?.roleId === s);
            foundAnyRole ? next() : await Promise.reject();
        } catch (e) {
            return res.status(403).json(responser({ message: "Access Denied" }));
        }
    };
};

export { verify, hasRole, hasAnyRole }
