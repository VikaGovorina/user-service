import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../modules/auth/auth.types";


export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = verifyToken(token) as JwtPayload;

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};