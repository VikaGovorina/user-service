import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";


export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: err.issues,
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ message: err.message || "Internal server error" });
};