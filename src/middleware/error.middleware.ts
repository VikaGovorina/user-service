import { NextFunction, Request, Response } from "express";


export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ message: err.message || "Internal server error" });
};