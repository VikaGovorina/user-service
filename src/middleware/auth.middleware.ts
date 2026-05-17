import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../modules/auth/auth.types";
import { HttpError } from "../utils/http-error";


export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new HttpError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new HttpError("Unauthorized", 401));
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;

        req.user = decoded;

        next();

    } catch (error) {
        next(new HttpError("Invalid token", 401));
    }
};