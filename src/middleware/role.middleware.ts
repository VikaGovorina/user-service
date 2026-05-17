import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";
import { HttpError } from "../utils/http-error";

type Role = "ADMIN" | "USER";

export const roleMiddleware = (roles: Role[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return next(new HttpError("Unauthorized", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new HttpError("Forbidden", 403));
        }

        next();
    };
};