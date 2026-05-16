import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../../validators/auth.validator";
import { loginUser, registerUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const result = await registerUser(validatedData);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
        message:
            error instanceof Error ? error.message : "Registration error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const result = await loginUser(validatedData);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message:
                error instanceof Error ? error.message : "Login error",
        });
    }
}